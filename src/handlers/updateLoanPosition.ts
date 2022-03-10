import { forceToCurrencyName } from "@acala-network/sdk-core";
import { SubstrateBlock, SubstrateEvent } from "@subql/types"
import { getStableCoinCurrency, getStartOfDay, getStartOfHour, getTokenDecimals } from '@acala-network/subql-utils';
import { getBlock, getAccount, getCollateral, getPriceBundle, getPosition, getHourlyPosition, getDailyPosition, getHourlyCollateral, getDailyCollateral, getExchangeBundle } from "../utils/record";
import { updateCollateral, updateDailyCollateral, updateDailyPosition, updateHourlyCollateral, updateHourlyPosition, updatePosition, updateParams, createUpdatePositionHistroy, createConfiscatePositionHistory } from ".";
import { getVolumeUSD } from '../utils/math';

export const updateLoanPosition = async (
  rawBlock: SubstrateBlock,
  account: string,
  collateralName: string,
  depositChanged: bigint,
  debitChanged: bigint, 
  shouldUpdatePosition = true
) => {
  const timestamp = rawBlock.timestamp;
  const startHour = getStartOfHour(timestamp);
  const startDay = getStartOfDay(timestamp);

  // get records
  const block = await getBlock(rawBlock);
  const owner = await getAccount(account.toString());
  const collateral = await getCollateral(collateralName);
  const priceBundle = await getPriceBundle(collateralName, rawBlock);
  const exchangeBundle = await getExchangeBundle(collateralName, rawBlock);
  const hourlyCollateral = await getHourlyCollateral(collateralName, startHour)
  const dailyCollateral = await getDailyCollateral(collateralName, startDay)
  const position = await getPosition(collateral.id, owner.id)
  const hourlyPosition = await getHourlyPosition(collateral.id, owner.id, startHour)
  const dailyPosition = await getDailyPosition(collateral.id, owner.id, startDay)

  const stableCoinDecimals = await getTokenDecimals(api as any, getStableCoinCurrency(api as any));
  const depositChangedUSD = getVolumeUSD(depositChanged, collateral.decimals, priceBundle.price)
  const debitChangedUSD = getVolumeUSD(debitChanged, stableCoinDecimals, exchangeBundle.debitExchangeRate)

  // update collateral first
  if (shouldUpdatePosition) {
    updateCollateral(collateral, depositChanged, debitChanged);
  }

  // recalculate volume
  const depositVolumeUSD = getVolumeUSD(collateral.depositAmount, collateral.decimals, priceBundle.price)
  const debitVolumeUSD = getVolumeUSD(collateral.debitAmount, stableCoinDecimals, exchangeBundle.debitExchangeRate)

  // update collatearl daily/hourly record
  if (shouldUpdatePosition) {
    updateHourlyCollateral(
      collateral,
      hourlyCollateral,
      exchangeBundle.debitExchangeRate,
      depositVolumeUSD,
      debitVolumeUSD,
      depositChanged,
      debitChanged,
      depositChangedUSD,
      debitChangedUSD
    );
    updateDailyCollateral(
      collateral,
      dailyCollateral,
      exchangeBundle.debitExchangeRate,
      depositVolumeUSD,
      debitVolumeUSD,
      depositChanged,
      debitChanged,
      depositChangedUSD,
      debitChangedUSD
    );

    // update user position
    updatePosition(
      position,
      block,
      depositChanged,
      debitChanged
    )
  }

  const depositVolumeUSDInPosition = getVolumeUSD(position.depositAmount, collateral.decimals, priceBundle.price);
  const debitVolumeUSDInPosition = getVolumeUSD(position.debitAmount, stableCoinDecimals, exchangeBundle.debitExchangeRate);

  if (shouldUpdatePosition) {
    updateHourlyPosition(
      hourlyPosition,
      position,
      exchangeBundle.debitExchangeRate,
      depositVolumeUSDInPosition,
      debitVolumeUSDInPosition,
      depositChanged,
      debitChanged,
      depositChangedUSD,
      debitChangedUSD
    )

    updateDailyPosition(
      dailyPosition,
      position,
      exchangeBundle.debitExchangeRate,
      depositVolumeUSDInPosition,
      debitVolumeUSDInPosition,
      depositChanged,
      debitChanged,
      depositChangedUSD,
      debitChangedUSD
    )
  }

  owner.txCount = owner.txCount + 1;
  position.updateAt = block.timestamp;
  position.updateAtBlockId = block.id;

  await owner.save();
  await collateral.save();
  await hourlyCollateral.save();
  await dailyCollateral.save();
  await position.save();
  await hourlyPosition.save();
  await dailyPosition.save();

  return {
    owner,
    exchangeBundle,
    collateral,
    priceBundle,
    depositChanged,
    depositChangedUSD,
    debitChanged,
    debitChangedUSD
  }
}

export async function handleLoanPositionUpdate (event: SubstrateEvent) {
  const [owner, collateral, _collateralChanged, _debitChanged] = event.event.data;

  const depositChanged = BigInt(_collateralChanged.toString())
  const debitChanged = BigInt(_debitChanged.toString())

  const data = await updateLoanPosition(
    event.block,
    owner.toString(),
    forceToCurrencyName(collateral),
    depositChanged,
    debitChanged
  );
  await createUpdatePositionHistroy(
    event,
    data.owner,
    forceToCurrencyName(collateral),
    data.depositChanged,
    data.debitChanged,
    data.depositChangedUSD,
    data.debitChangedUSD,
    data.priceBundle.price,
    data.exchangeBundle.debitExchangeRate
  )
}

export async function handleConfiscate (event: SubstrateEvent) {
  const [owner, collateral, _collateralChanged, _debitChanged] = event.event.data;

  const depositChanged = -BigInt(_collateralChanged.toString())
  const debitChanged = -BigInt(_debitChanged.toString())

  // should update position in the the old version beacuse confiscate will not create PositionUpdated event
  const shouldUpdate = !event.extrinsic.events.find((item) => {
    return item.event.section === 'loans' && item.event.method === 'PositionUpdated';
  })

  const data = await updateLoanPosition(
    event.block,
    owner.toString(),
    forceToCurrencyName(collateral),
    depositChanged,
    debitChanged,
    shouldUpdate
  );

  await createConfiscatePositionHistory(
    event,
    data.owner,
    data.collateral,
    data.depositChanged,
    data.debitChanged,
    data.depositChangedUSD,
    data.debitChangedUSD
  )
}