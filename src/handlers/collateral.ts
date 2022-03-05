import { forceToCurrencyName } from "@acala-network/sdk-core";
import { getStartOfHour } from "@acala-network/subql-utils";
import { CurrencyId } from "@acala-network/types/interfaces";
import { Block, Collateral, HourCollateral } from "../types";
import { getCollateral, getDailyCollateral, getHourlyCollateral } from "../utils/record"

export const updateCollateral = async (
  collateral: Collateral,
  collateralAdjustment: bigint,
  debitAdjustment: bigint
) => {
  collateral.debitAmount = collateral.debitAmount + debitAdjustment;
  collateral.depositAmount = collateral.debitAmount + collateralAdjustment;
  collateral.txCount = collateral.txCount + 1;
}

export const updateHourlyCollateral = async (
  block: Block,
  collateral: Collateral,
  hourly: HourCollateral,
  depositChanged: bigint,
  debitChanged: bigint,
  depositChangedUSD: bigint,
  debitChangedUSD: bigint
) => {
  const timestamp = getStartOfHour(block.timestamp)
  const id = `${collateral.id}-${timestamp}`
  const record = await getHourlyCollateral(id);

  record.collateralId = collateral.id;

  record.depositAmount = collateral.debitAmount;
  record.debitAmount = collateral.debitAmount;
  record.depositAmountUSD = 
  record.debitVolume = record.debitVolume + debitVolume;
  record.totalDepositVolumeUSD = record.totalDepositVolumeUSD + depositVolumeUSD;
  record.totalDebitVolumeUSD = record.totalDebitVolumeUSD + debitVolumeUSD;
  record.txCount = record.txCount + 1;
  record.timestamp = timestamp;
  record.debitExchangeRate = await getExchangeRateFromDb(block, token);

  await hourlyCollateral.save()
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