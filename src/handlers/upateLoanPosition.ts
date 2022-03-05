import { FixedPointNumber as FN, forceToCurrencyName } from "@acala-network/sdk-core";
import { SubstrateEvent } from "@subql/types"
import { getStartOfDay, getStartOfHour } from '@acala-network/subql-utils';
import { getBlock, getAccount, getCollateral, getPriceBundle, getPosition, getHourlyPosition } from "../utils/record";
import { AccountId, Balance, CurrencyId } from "@acala-network/types/interfaces";
import { updateCollateral, updateDailyCollateral, updateDailyPosition, updateHourlyCollateral, updateHourlyPosition, updatePosition, updateParams, createUpdatePositionHistroy, createConfiscatePositionHistory } from ".";

export const handleLoanPositionUpdate = async (event: SubstrateEvent, isLiquidatiton = false) => {
  const [_account, _collateral, collateral_amount, debit_amount] = event.event.data as unknown as [AccountId, CurrencyId, Balance, Balance];

  const timestamp = event.block.timestamp;
  const collateralName = forceToCurrencyName(_collateral);
  const startHour = getStartOfHour(timestamp);
  const startDay = getStartOfDay(timestamp);

  const block = await getBlock(event.block);
  const sender = await getAccount(_account.toString());
  const collateral = await getCollateral(collateralName);
  const priceBundle = await getPriceBundle(collateralName, event.block);
  const position = await getPosition(`${collateral.id}-${sender.id}`)
  const hourlyPosition = await getHourlyPosition(`${collateral.id}-${sender.id}-${startHour}`)
  
  const price = FN.fromInner(priceBundle.price.toString(), 18);
  const owner = account.id;
  const collateralAdjustment = isLiquidatiton ? -BigInt(collateral_amount.toString()) : BigInt(collateral_amount.toString());
  const debitAdjustment = isLiquidatiton ? -BigInt(debit_amount.toString()) : BigInt(debit_amount.toString());

  const collateralUSD = BigInt(FN.fromInner(collateral_amount.toString(), collateral.decimals).times(price).toChainData());
  const debitUSD = BigInt(FN.fromInner(debit_amount.toString(), collateral.decimals).times(price).toChainData());
  const hourTime = getStartOfHour(block.timestamp);
  const dailyTime = getStartOfDay(block.timestamp);

  await updateCollateral(collateral, collateralAdjustment, debitAdjustment);
  await updateHourlyCollateral(block, collateral, hourTime, collateralAdjustment, debitAdjustment, collateralUSD, debitUSD);
  await updateDailyCollateral(block, collateral, dailyTime, collateralAdjustment, debitAdjustment, collateralUSD, debitUSD);

  await updatePosition(event, owner, collateral, collateralAdjustment, debitAdjustment);
  await updateHourlyPosition(block, owner, collateral, hourTime, collateralAdjustment, debitAdjustment, collateralUSD, debitUSD);
  await updateDailyPosition(block, owner, collateral, dailyTime, collateralAdjustment, debitAdjustment, collateralUSD, debitUSD);

  if(isLiquidatiton) {
    await createConfiscatePositionHistory(event, owner, collateral, -collateralAdjustment, -debitAdjustment, -collateralUSD, -debitUSD);
  } else {
  }

  await createUpdatePositionHistroy(event, owner, collateral, collateralAdjustment, debitAdjustment, collateralUSD, debitUSD);

  account.txCount = account.txCount + 1;
  
  await account.save();
  await collateral.save();
}