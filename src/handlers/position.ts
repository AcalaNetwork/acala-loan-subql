import { forceToCurrencyName } from "@acala-network/sdk-core";
import { CurrencyId } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import dayjs from "dayjs";
import { ensureBlock, ensureExtrinsic } from ".";
import { Block } from "../types";
import { getExchangeRateFromDb } from "../utils";
import { getConfiscatePosition, getDailyPosition, getHourPosition, getPosition, getUpdatePosition } from "../utils/record";

export const updatePosition = async (event: SubstrateEvent, owner: string, token: CurrencyId, totalDepositVolumeAjustment: bigint, totalDebitVolumeAjustment: bigint) => {
  const tokenName = forceToCurrencyName(token);
  const id = `${owner}-${tokenName}`;
  const position = await getPosition(id);
  position.collateralId = tokenName;
  position.ownerId = owner;
  position.depositVolume = position.depositVolume + totalDepositVolumeAjustment;
  position.debitVolume = position.debitVolume + totalDebitVolumeAjustment;
  position.updateAtId = (await ensureBlock(event)).id;

  await position.save();
  return position;
}

export const updateHourPosition = async (block: Block, owner: string, token: CurrencyId, timestamp: Date, depositVolume: bigint, debitVolume: bigint, depositVolumeUSD: bigint, debitVolumeUSD: bigint) => {
  const tokenName = forceToCurrencyName(token);
  const id = `${owner}-${tokenName}-${dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')}`;
  const hourPosition = await getHourPosition(id);
  hourPosition.ownerId = owner;
  hourPosition.collateralId = tokenName;
  hourPosition.depositVolume = hourPosition.depositVolume + depositVolume;
  hourPosition.debitVolume = hourPosition.debitVolume + debitVolume;
  hourPosition.depositVolumeUSD = hourPosition.depositVolumeUSD + depositVolumeUSD;
  hourPosition.debitVolumeUSD = hourPosition.debitVolumeUSD + debitVolume;
  hourPosition.txCount = hourPosition.txCount + BigInt(1);
  hourPosition.timestamp = timestamp;
  hourPosition.debitExchangeRate = await getExchangeRateFromDb(block, token);

  await hourPosition.save();
  return hourPosition;
}

export const updateDailyPosition = async (block: Block, owner: string, token: CurrencyId, timestamp: Date, depositVolume: bigint, debitVolume: bigint, depositVolumeUSD: bigint, debitVolumeUSD: bigint) => {
  const tokenName = forceToCurrencyName(token);
  const id = `${owner}-${tokenName}-${dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')}`;
  const dailyPosition = await getDailyPosition(id);
  dailyPosition.ownerId = owner;
  dailyPosition.collateralId = tokenName;
  dailyPosition.depositVolume = dailyPosition.depositVolume + depositVolume;
  dailyPosition.debitVolume = dailyPosition.debitVolume + debitVolume;
  dailyPosition.depositVolumeUSD = dailyPosition.depositVolumeUSD + depositVolumeUSD;
  dailyPosition.debitVolumeUSD = dailyPosition.debitVolumeUSD + debitVolume;
  dailyPosition.txCount = dailyPosition.txCount + BigInt(1);
  dailyPosition.timestamp = timestamp;
  dailyPosition.debitExchangeRate = await getExchangeRateFromDb(block, token);

  await dailyPosition.save();
  return dailyPosition;
}

export const createUpdatePositionHistroy = async (event: SubstrateEvent, owner: string, token: CurrencyId, collateralAjustment: bigint, debitAjustment: bigint, collateralUSD: bigint, debitUSD: bigint) => {
  const tokenName = forceToCurrencyName(token);
  const extrinshcData = await ensureExtrinsic(event);
  const blockData = await ensureBlock(event);
  const historyId = `${extrinshcData.hash}-${event.event.index.toString()}`;
  const history = await getUpdatePosition(historyId);
  history.ownerId = owner;
  history.blockId = blockData.hash;
  history.collateralAjustment = collateralAjustment;
  history.debitAjustment = debitAjustment;
  history.collateralAjustmentUSD = collateralUSD;
  history.debitAjustmentUSD = debitUSD;
  history.collateralId = tokenName;
  history.extrinsicId = extrinshcData.id;
  await history.save();
}

export const createConfiscatePositionHistory = async (event: SubstrateEvent, owner: string, token: CurrencyId, collateralAjustment: bigint, debitAjustment: bigint, collateralUSD: bigint, debitUSD: bigint) => {
  const tokenName = forceToCurrencyName(token);
  const extrinshcData = await ensureExtrinsic(event);
  const blockData = await ensureBlock(event);
  const historyId = `${extrinshcData.hash}-${event.event.index.toString()}`;
  const history = await getConfiscatePosition(historyId);
  history.ownerId = owner;
  history.blockId = blockData.hash;
  history.collateralId = tokenName;
  history.collateralAjustment = collateralAjustment;
  history.debitAjustment = debitAjustment;
  history.collateralAjustmentUSD = collateralUSD;
  history.debitAjustmentUSD = debitUSD;
  history.extrinsicId = extrinshcData.id;
  await history.save();
}