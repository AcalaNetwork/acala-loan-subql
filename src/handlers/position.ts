import { SubstrateEvent } from "@subql/types";
import { ensureBlock, ensureExtrinsic } from ".";
import { getExchangeRateFromDb } from "../utils";
import { getConfiscatePosition, getDailyPosition, getHourPosition, getPosition, getUpdatePosition } from "../utils/record";

export const updatePosition = async (event: SubstrateEvent, owner: string, token: string, totalDepositVolumeAjustment: bigint, totalDebitVolumeAjustment: bigint) => {
  const id = `${owner}-${token}`;
  const position = await getPosition(id);
  position.collateralId = token;
  position.ownerId = owner;
  position.depositVolume = position.depositVolume + totalDepositVolumeAjustment;
  position.debitVolume = position.debitVolume + totalDebitVolumeAjustment;
  position.updateAtId = (await ensureBlock(event)).id;

  await position.save();
  return position;
}

export const updateHourPosition = async (blockHeight: bigint, owner: string, token: string, timestamp: Date, depositVolume: bigint, debitVolume: bigint, depositVolumeUSD: bigint, debitVolumeUSD: bigint) => {
  const id = `${owner}-${token}-${timestamp.toString()}`;
  const hourPosition = await getHourPosition(id);
  hourPosition.ownerId = owner;
  hourPosition.collateralId = token;
  hourPosition.depositVolume = hourPosition.depositVolume + depositVolume;
  hourPosition.debitVolume = hourPosition.debitVolume + debitVolume;
  hourPosition.depositVolumeUSD = hourPosition.depositVolumeUSD + depositVolumeUSD;
  hourPosition.debitVolumeUSD = hourPosition.debitVolumeUSD + debitVolume;
  hourPosition.txCount = hourPosition.txCount + BigInt(1);
  hourPosition.timestamp = timestamp;
  hourPosition.debitExchangeRate = await getExchangeRateFromDb(blockHeight, token);

  await hourPosition.save();
  return hourPosition;
}

export const updateDailyPosition = async (blockHeight: bigint, owner: string, token: string, timestamp: Date, depositVolume: bigint, debitVolume: bigint, depositVolumeUSD: bigint, debitVolumeUSD: bigint) => {
  const id = `${owner}-${token}-${timestamp.toString()}`;
  const dailyPosition = await getDailyPosition(id);
  dailyPosition.ownerId = owner;
  dailyPosition.collateralId = token;
  dailyPosition.depositVolume = dailyPosition.depositVolume + depositVolume;
  dailyPosition.debitVolume = dailyPosition.debitVolume + debitVolume;
  dailyPosition.depositVolumeUSD = dailyPosition.depositVolumeUSD + depositVolumeUSD;
  dailyPosition.debitVolumeUSD = dailyPosition.debitVolumeUSD + debitVolume;
  dailyPosition.txCount = dailyPosition.txCount + BigInt(1);
  dailyPosition.timestamp = timestamp;
  dailyPosition.debitExchangeRate = await getExchangeRateFromDb(blockHeight, token);

  await dailyPosition.save();
  return dailyPosition;
}

export const createUpdatePositionHistroy = async (event: SubstrateEvent, owner: string, token: string, collateralAjustment: bigint, debitAjustment: bigint, collateralUSD: bigint, debitUSD: bigint) => {
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
  history.collateralId = token;
  history.extrinsicId = extrinshcData.id;
  await history.save();
}

export const createConfiscatePositionHistory = async (event: SubstrateEvent, owner: string, token: string, collateralAjustment: bigint, debitAjustment: bigint, collateralUSD: bigint, debitUSD: bigint) => {
  const extrinshcData = await ensureExtrinsic(event);
  const blockData = await ensureBlock(event);
  const historyId = `${extrinshcData.hash}-${event.event.index.toString()}`;
  const history = await getConfiscatePosition(historyId);
  history.ownerId = owner;
  history.blockId = blockData.hash;
  history.collateralId = token;
  history.collateralAjustment = collateralAjustment;
  history.debitAjustment = debitAjustment;
  history.collateralAjustmentUSD = collateralUSD;
  history.debitAjustmentUSD = debitUSD;
  history.extrinsicId = extrinshcData.id;
  await history.save();
}