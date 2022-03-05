import { forceToCurrencyName } from "@acala-network/sdk-core";
import { CurrencyId } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { getBlock, ensureExtrinsic } from ".";
import { Account, Block, Collateral, DailyPosition, HourlyPosition, Position} from "../types";
import { getVolumeUSD } from "../utils/math";
import { getConfiscatePosition, getUpdatePosition } from "../utils/record";

export const updatePAjustmentsition = async (
  position: Position,
  block: Block,
  depositChanged: bigint,
  debitChanged: bigint
) => {
  position.depositAmount = position.depositAmount + depositChanged;
  position.debitAmount = position.debitAmount + debitChanged;
  position.updateAt = block.timestamp
  position.updateAtBlockId = block.id
}

export const updateHourlyPosition = async (
  collateral: Collateral,
  stableCoin: Collateral,
  hourlyPosition: HourlyPosition,
  position: Position,
  price: bigint,
  exchangeRate: bigint,
  depositChanged: bigint,
  debitChanged: bigint,
) => {
  hourlyPosition.depositAmount = position.depositAmount;
  hourlyPosition.debitAmount = position.depositAmount;
  hourlyPosition.depositVolumeUSD = BigInt(getVolumeUSD(position.depositAmount, collateral.decimals, price).toString())
  hourlyPosition.debitVolumeUSD = BigInt(getVolumeUSD(position.debitAmount, stableCoin.decimals, exchangeRate).toString())
  hourlyPosition.debitExchangeRate = exchangeRate;
  hourlyPosition.depositChanged = hourlyPosition.depositChanged + depositChanged;
  hourlyPosition.debitChanged = hourlyPosition.debitChanged + debitChanged;
  hourlyPosition.depositChangedUSD = BigInt(getVolumeUSD(hourlyPosition.depositChanged, collateral.decimals, price).toString())
  hourlyPosition.debitChangedUSD = BigInt(getVolumeUSD(hourlyPosition.debitChanged, stableCoin.decimals, exchangeRate).toString())
  hourlyPosition.txCount = hourlyPosition.txCount + 1;
}

export const updatedailyPosition = async (
  collateral: Collateral,
  stableCoin: Collateral,
  dailyPosition: DailyPosition,
  position: Position,
  price: bigint,
  exchangeRate: bigint,
  depositChanged: bigint,
  debitChanged: bigint,
) => {
  dailyPosition.depositAmount = position.depositAmount;
  dailyPosition.debitAmount = position.depositAmount;
  dailyPosition.depositVolumeUSD = BigInt(getVolumeUSD(position.depositAmount, collateral.decimals, price).toString())
  dailyPosition.debitVolumeUSD = BigInt(getVolumeUSD(position.debitAmount, stableCoin.decimals, exchangeRate).toString())
  dailyPosition.debitExchangeRate = exchangeRate;
  dailyPosition.depositChanged = dailyPosition.depositChanged + depositChanged;
  dailyPosition.debitChanged = dailyPosition.debitChanged + debitChanged;
  dailyPosition.depositChangedUSD = BigInt(getVolumeUSD(dailyPosition.depositChanged, collateral.decimals, price).toString())
  dailyPosition.debitChangedUSD = BigInt(getVolumeUSD(dailyPosition.debitChanged, stableCoin.decimals, exchangeRate).toString())
  dailyPosition.txCount = dailyPosition.txCount + 1;
}

export const createUpdatePositionHistroy = async (
  event: SubstrateEvent,
  owner: Account,
  token: CurrencyId,
  collateralAdjustment: bigint,
  debitAdjustment: bigint,
  collateralUSD: bigint,
  debitUSD: bigint
) => {
  const tokenName = forceToCurrencyName(token);
  const extrinshc = await ensureExtrinsic(event);
  const blockData = await getBlock(event);
  const historyId = `${blockData.id}-${event.event.index.toString()}`;
  const history = await getUpdatePosition(historyId);

  history.ownerId = owner.id;
  history.blockId = blockData.hash;
  history.collateralAdjustment = collateralAdjustment;
  history.debitAdjustment = debitAdjustment;
  history.collateralAdjustmentUSD = collateralUSD;
  history.debitAdjustmentUSD = debitUSD;
  history.collateralId = tokenName;
  history.extrinsicId = extrinshc.id;
  await history.save();
}

export const createConfiscatePositionHistory = async (event: SubstrateEvent, owner: string, token: CurrencyId, collateralAdjustment: bigint, debitAdjustment: bigint, collateralUSD: bigint, debitUSD: bigint) => {
  const tokenName = forceToCurrencyName(token);
  const extrinshcData = await ensureExtrinsic(event);
  const blockData = await getBlock(event);
  const historyId = `${blockData.hash}-${event.event.index.toString()}`;
  const history = await getConfiscatePosition(historyId);
  history.ownerId = owner;
  history.blockId = blockData.hash;
  history.collateralId = tokenName;
  history.collateralAdjustment = collateralAdjustment;
  history.debitAdjustment = debitAdjustment;
  history.collateralAdjustmentUSD = collateralUSD;
  history.debitAdjustmentUSD = debitUSD;
  history.extrinsicId = extrinshcData.id;
  await history.save();
}