import { forceToCurrencyName } from "@acala-network/sdk-core";
import { CurrencyId } from "@acala-network/types/interfaces";
import dayjs from "dayjs";
import { Block } from "../types";
import { getExchangeRateFromDb } from "../utils";
import { getCollateral, getDailyCollateral, getHourCollateral } from "../utils/record"

export const updateCollateral = async (token: CurrencyId, totalDepositVolumeAjustment: bigint, totalDebitVolumeAjustment: bigint) => {
  const collateral = await getCollateral(forceToCurrencyName(token));
  collateral.totalDebitVolume = collateral.totalDebitVolume + totalDebitVolumeAjustment;
  collateral.totalDepositVolume = collateral.totalDepositVolume + totalDepositVolumeAjustment;
  collateral.txCount = collateral.txCount + 1;

  await collateral.save();
  return collateral;
}

export const updateHourCollateral = async (block: Block, token: CurrencyId, timestamp: Date, depositVolume: bigint, debitVolume: bigint, depositVolumeUSD: bigint, debitVolumeUSD: bigint) => {
  const tokenName = forceToCurrencyName(token);
  const id = `${tokenName}-${timestamp.getTime()}`
  const hourCollateral = await getHourCollateral(id);
  hourCollateral.collateralId = tokenName;
  hourCollateral.depositVolume = hourCollateral.depositVolume + depositVolume;
  hourCollateral.debitVolume = hourCollateral.debitVolume + debitVolume;
  hourCollateral.totalDepositVolumeUSD = hourCollateral.totalDepositVolumeUSD + depositVolumeUSD;
  hourCollateral.totalDebitVolumeUSD = hourCollateral.totalDebitVolumeUSD + debitVolumeUSD;
  hourCollateral.txCount = hourCollateral.txCount + BigInt(1);
  hourCollateral.timestamp = timestamp;
  hourCollateral.debitExchangeRate = await getExchangeRateFromDb(block, token);

  await hourCollateral.save()
  return hourCollateral;
}

export const updateDailyCollateral = async (block: Block, token: CurrencyId, timestamp: Date, depositVolume: bigint, debitVolume: bigint, depositVolumeUSD: bigint, debitVolumeUSD: bigint) => {
  const tokenName = forceToCurrencyName(token);
  const id = `${tokenName}-${timestamp.getTime()}`;
  const dailyCollateral = await getDailyCollateral(id);
  dailyCollateral.collateralId = tokenName;
  dailyCollateral.depositVolume = dailyCollateral.depositVolume + depositVolume;
  dailyCollateral.debitVolume = dailyCollateral.debitVolume + debitVolume;
  dailyCollateral.totalDepositVolumeUSD = dailyCollateral.totalDepositVolumeUSD + depositVolumeUSD;
  dailyCollateral.totalDebitVolumeUSD = dailyCollateral.totalDebitVolumeUSD + debitVolumeUSD;
  dailyCollateral.txCount = dailyCollateral.txCount + BigInt(1);
  dailyCollateral.timestamp = timestamp;
  dailyCollateral.debitExchangeRate = await getExchangeRateFromDb(block, token);

  await dailyCollateral.save()
  return dailyCollateral;
}