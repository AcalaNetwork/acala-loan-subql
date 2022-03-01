import { FixedPointNumber as FN, forceToCurrencyIdName } from "@acala-network/sdk-core";
import { SubstrateEvent } from "@subql/types"
import { getDateStartOfDay, getDateStartOfHour } from '../utils/date';
import { getAccount, getCollateral } from "../utils/record";
import { queryPrice } from "../utils";
import { AccountId, Balance, CurrencyId } from "@acala-network/types/interfaces";
import { ensureBlock, updateCollateral, updateDailyCollateral, updateDailyPosition, updateHourCollateral, updateHourPosition, updatePosition, updateParams, createUpdatePositionHistroy, createConfiscatePositionHistory } from ".";

export const uploadLoainPosition = async (event: SubstrateEvent, isLiquidatiton = false) => {
  const [account, collateral, collateral_amount, debit_amount] = event.event.data as unknown as [AccountId, CurrencyId, Balance, Balance];

  const blockData = await ensureBlock(event);
  const accountData = await getAccount(account.toString());
  const tokenData = await getCollateral(forceToCurrencyIdName(collateral));
  const price = await queryPrice(event, forceToCurrencyIdName(collateral));
  
  const owner = accountData.id;
  const token = tokenData.id;
  const collateralVolume = isLiquidatiton ? -BigInt(collateral_amount.toString()) : BigInt(collateral_amount.toString());
  const debitVolume = isLiquidatiton ? -BigInt(debit_amount.toString()) : BigInt(debit_amount.toString());
  const collateralUSD = BigInt(FN.fromInner(collateral_amount.toString(), tokenData.decimals).times(price).toChainData().toString());
  const debitUSD = BigInt(FN.fromInner(debit_amount.toString(), tokenData.decimals).times(price).toChainData().toString());

  const hourTime = getDateStartOfHour(blockData.timestamp).toDate();
  const dailyTime = getDateStartOfDay(blockData.timestamp).toDate();

  await updateCollateral(token, collateralVolume, debitVolume);
  await updateHourCollateral(blockData.number, token, hourTime, collateralVolume, debitVolume, collateralUSD, debitUSD);
  await updateDailyCollateral(blockData.number, token, dailyTime, collateralVolume, debitVolume, collateralUSD, debitUSD);

  await updatePosition(event, owner, token, collateralVolume, debitVolume);
  await updateHourPosition(blockData.number, owner, token, hourTime, collateralVolume, debitVolume, collateralUSD, debitUSD);
  await updateDailyPosition(blockData.number, owner, token, dailyTime, collateralVolume, debitVolume, collateralUSD, debitUSD);

  if(isLiquidatiton) {
    await createConfiscatePositionHistory(event, owner, token, -collateralVolume, -debitVolume, -collateralUSD, -debitUSD);
  } else {
    await createUpdatePositionHistroy(event, owner, token, collateralVolume, debitVolume, collateralUSD, debitUSD);
  }

  await updateParams(event, 'loans');
}