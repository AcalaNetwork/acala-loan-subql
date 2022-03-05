import { SubstrateEvent } from "@subql/types";
import { Account, Block, Collateral, DailyPosition, HourlyPosition, Position} from "../types";
import { getBlock, getCollateral, getConfiscatePosition, getExtrinsic, getUpdatePosition } from "../utils/record";

export const updatePosition= (
  position: Position,
  block: Block,
  depositChanged: bigint,
  debitChanged: bigint
) => {
  position.depositAmount = position.depositAmount + depositChanged;
  position.debitAmount = position.debitAmount + debitChanged;
  position.updateAt = block.timestamp;
  position.updateAtBlockId = block.id;
  position.txCount = position.txCount + 1;
}

export const updateHourlyPosition = (
  hourlyPosition: HourlyPosition,
  position: Position,
  exchangeRate: bigint,
  depositVolumeUSD: bigint,
  debitVolumeUSD: bigint,
  depositChanged: bigint,
  debitChanged: bigint,
  depositChangedUSD: bigint,
  debitChangedUSD: bigint
) => {
  hourlyPosition.depositAmount = position.depositAmount;
  hourlyPosition.debitAmount = position.debitAmount;
  hourlyPosition.depositVolumeUSD = depositVolumeUSD;
  hourlyPosition.debitVolumeUSD = debitVolumeUSD;
  hourlyPosition.debitExchangeRate = exchangeRate;
  hourlyPosition.depositChanged = hourlyPosition.depositChanged + depositChanged;
  hourlyPosition.debitChanged = hourlyPosition.debitChanged + debitChanged;
  hourlyPosition.depositChangedUSD = hourlyPosition.depositChangedUSD + depositChangedUSD;
  hourlyPosition.debitChangedUSD = hourlyPosition.debitChangedUSD + debitChangedUSD;
  hourlyPosition.txCount = hourlyPosition.txCount + 1;
}

export const updateDailyPosition = (
  dailyPosition: DailyPosition,
  position: Position,
  exchangeRate: bigint,
  depositVolumeUSD: bigint,
  debitVolumeUSD: bigint,
  depositChanged: bigint,
  debitChanged: bigint,
  depositChangedUSD: bigint,
  debitChangedUSD: bigint
) => {
  dailyPosition.depositAmount = position.depositAmount;
  dailyPosition.debitAmount = position.debitAmount;
  dailyPosition.depositVolumeUSD = depositVolumeUSD;
  dailyPosition.debitVolumeUSD = debitVolumeUSD;
  dailyPosition.debitExchangeRate = exchangeRate;
  dailyPosition.depositChanged = dailyPosition.depositChanged + depositChanged;
  dailyPosition.debitChanged = dailyPosition.debitChanged + debitChanged;
  dailyPosition.depositChangedUSD = dailyPosition.depositChangedUSD + depositChangedUSD;
  dailyPosition.debitChangedUSD = dailyPosition.debitChangedUSD + debitChangedUSD;
  dailyPosition.txCount = dailyPosition.txCount + 1;
}

export const createUpdatePositionHistroy = async (
  event: SubstrateEvent,
  owner: Account,
  collateralName: string,
  depositChanged: bigint,
  debitChanged: bigint,
  depositChangedUSD: bigint,
  debitChangedUSD: bigint,
  price: bigint
) => {
  const collateral = await getCollateral(collateralName);
  const block = await getBlock(event.block);
  const history = await getUpdatePosition(`${block.id}-${event.event.index.toString()}`);

  history.ownerId = owner.id;
  history.collateralId = collateral.id;
  history.blockId = block.id;
  history.collateralAdjustment = depositChanged;
  history.debitAdjustment = debitChanged;
  history.collateralAdjustmentUSD = depositChangedUSD;
  history.debitAdjustmentUSD = debitChangedUSD;
  history.price = price;
  history.timestamp = block.timestamp;

  if (event.extrinsic) {
    const extrinsic = await getExtrinsic(event.extrinsic);
    history.extrinsicId = extrinsic.id;
  }

  await history.save();
}

export const createConfiscatePositionHistory = async (
  event: SubstrateEvent,
  owner: Account,
  collateral: Collateral,
  depositChanged: bigint,
  debitChanged: bigint,
  depositChangedUSD: bigint,
  debitChangedUSD: bigint
) => {
  const block = await getBlock(event.block);
  const historyId = `${block.id}-${event.event.index.toString()}`;
  const history = await getConfiscatePosition(historyId);

  history.blockId = block.id;
  history.ownerId = owner.id
  history.collateralId = collateral.id;
  history.collateralAdjustment = depositChanged;
  history.debitAdjustment = debitChanged;
  history.collateralAdjustmentUSD = depositChangedUSD;
  history.debitAdjustmentUSD = debitChangedUSD;

  if (event.extrinsic) {
    const extrinsic = await getExtrinsic(event.extrinsic);

    history.senderId = extrinsic.senderId;
    history.extrinsicId = extrinsic.id;
  }

  await history.save();
}