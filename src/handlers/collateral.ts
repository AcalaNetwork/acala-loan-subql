import { getExchangeRateFromDb } from "../utils";
import { getCollateral, getDailyCollateral, getHourCollateral } from "../utils/record"

export const updateCollateral = async (token: string, totalDepositVolumeAjustment: bigint, totalDebitVolumeAjustment: bigint) => {
  const collateral = await getCollateral(token);
  collateral.totalDebitVolume = collateral.totalDebitVolume + totalDebitVolumeAjustment;
  collateral.totalDepositVolume = collateral.totalDepositVolume + totalDepositVolumeAjustment;
  collateral.txCount = collateral.txCount + 1;

  await collateral.save();
  return collateral;
}

export const updateHourCollateral = async (blockHeight: bigint, token: string, timestamp: Date, depositVolume: bigint, debitVolume: bigint, depositVolumeUSD: bigint, debitVolumeUSD: bigint) => {
  const id = `${token}-${timestamp.toString()}`
  const hourCollateral = await getHourCollateral(id);
  hourCollateral.collateralId = token;
  hourCollateral.depositVolume = hourCollateral.depositVolume + depositVolume;
  hourCollateral.debitVolume = hourCollateral.debitVolume + debitVolume;
  hourCollateral.totalDepositVolumeUSD = hourCollateral.totalDepositVolumeUSD + depositVolumeUSD;
  hourCollateral.totalDebitVolumeUSD = hourCollateral.totalDebitVolumeUSD + debitVolumeUSD;
  hourCollateral.txCount = hourCollateral.txCount + BigInt(1);
  hourCollateral.timestamp = timestamp;
  hourCollateral.debitExchangeRate = await getExchangeRateFromDb(blockHeight, token);

  await hourCollateral.save()
  return hourCollateral;
}

export const updateDailyCollateral = async (blockHeight: bigint, token: string, timestamp: Date, depositVolume: bigint, debitVolume: bigint, depositVolumeUSD: bigint, debitVolumeUSD: bigint) => {
  const id = `${token}-${timestamp.toString()}`;
  const dailyCollateral = await getDailyCollateral(id);
  dailyCollateral.collateralId = token;
  dailyCollateral.depositVolume = dailyCollateral.depositVolume + depositVolume;
  dailyCollateral.debitVolume = dailyCollateral.debitVolume + debitVolume;
  dailyCollateral.totalDepositVolumeUSD = dailyCollateral.totalDepositVolumeUSD + depositVolumeUSD;
  dailyCollateral.totalDebitVolumeUSD = dailyCollateral.totalDebitVolumeUSD + debitVolumeUSD;
  dailyCollateral.txCount = dailyCollateral.txCount + BigInt(1);
  dailyCollateral.timestamp = timestamp;
  dailyCollateral.debitExchangeRate = await getExchangeRateFromDb(blockHeight, token);

  await dailyCollateral.save()
  return dailyCollateral;
}