import { getTokenDecimals, queryPriceFromOracle } from "@acala-network/subql-utils";
import { SubstrateBlock, SubstrateExtrinsic } from "@subql/types";
import { queryExchangeRate } from ".";
import {
  Account, Collateral, Block, CollateralParams,
  CollateralParamsHistory,
  DailyCollateral,
  DailyPosition,
  ExchangeBundle,
  Extrinsic,
  HourCollateral,
  HourlyPosition,
  LiquidUnsafe,
  Position,
  PriceBundle,
  TransferPosition,
  UpdateCollateralParams,
  UpdatePosition,
  ConfiscatePosition,
  CloseByDex,
} from "../types";

export const getBlock = async (block: SubstrateBlock) => {
  const id = block.block.header.number.toString();

  let record = await Block.get(id);

  if (!record) {
    record = new Block(id);

    record.hash = block.hash.toString();
    record.number = BigInt(id);
    record.timestamp = block.timestamp;

    // never change after save
    record.save()
  }

  return record;
}

export const getExtrinsic = async (extrinsic: SubstrateExtrinsic) => {
  const id = extrinsic.extrinsic.toString();

  let record = await Extrinsic.get(id);

  if (!record) {
    record = new Extrinsic(id);

    record.hash =id 
    record.blockId =extrinsic.block.block.header.number.toString(); 
    record.method = extrinsic.extrinsic.method.method; 
    record.section = extrinsic.extrinsic.method.section; 
    record.raw = extrinsic.extrinsic.toHex();
  }

  return record;
}

export const getAccount = async (address: string) => {
  let record = await Account.get(address);

  if (!record ) {
    record = new Account(address);

    record.address = address;
    record.txCount = 0;

    record.save();
  }

  return record;
}

export const getCollateral = async (token: string) => {
  let record = await Collateral.get(token);

  if (!record) {
    record = new Collateral(token);
    const decimals = await getTokenDecimals(api as any, token);

    record.name = token;
    record.decimals = decimals;
    record.depositAmount = BigInt(0);
    record.debitAmount = BigInt(0);
    record.txCount = 0;

    record.save()
  } 

  return record;
}

export const getHourlyCollateral = async (id: string) => {
  let record = await HourCollateral.get(id);

  if (!record) {
    record = new HourCollateral(id);

    record.collateralId = '';
    record.depositAmount = BigInt(0);
    record.debitAmount = BigInt(0);
    record.depositVolumeUSD = BigInt(0);
    record.debitVolumeUSD = BigInt(0);
    record.debitExchangeRate = BigInt(0);
    record.txCount = 0
    record.timestamp = new Date();
  }

  return record;
}

export const getDailyCollateral = async (id: string) => {
  let record = await DailyCollateral.get(id);

  if (!record) {
    record = new DailyCollateral(id);

    record.collateralId = '';
    record.debitAmount = BigInt(0);
    record.depositAmount = BigInt(0);
    record.debitVolumeUSD = BigInt(0);
    record.depositVolumeUSD = BigInt(0);
    record.debitExchangeRate = BigInt(0);
    record.timestamp = new Date();
    record.txCount = 0;
  }

  return record;
}

export const getPosition = async (id: string) => {
  let record = await Position.get(id);

  if (!record) {
    record = new Position(id);

    record.collateralId = '';
    record.ownerId = '';
    record.depositAmount = BigInt(0);
    record.debitAmount = BigInt(0);
    record.updateAt = new Date();
    record.updateAtBlockId = '';
  }

  return record;
}

export const getHourlyPosition = async (id: string) => {
  let record = await HourlyPosition.get(id);

  if (!record) {
    record = new HourlyPosition(id);

    record.collateralId = '';
    record.depositAmount = BigInt(0);
    record.debitAmount = BigInt(0);
    record.depositVolumeUSD = BigInt(0);
    record.debitVolumeUSD = BigInt(0);
    record.debitExchangeRate = BigInt(0);
    record.txCount = 0
    record.timestamp = new Date();
  }

  return record;
}

export const getDailyPosition = async (id: string) => {
  let record = await DailyPosition.get(id);

  if (!record) {
    record = new DailyPosition(id);

    record.collateralId = '';
    record.ownerId = '';
    record.debitAmount = BigInt(0);
    record.depositAmount = BigInt(0);
    record.depositVolumeUSD = BigInt(0);
    record.debitVolumeUSD = BigInt(0);
    record.debitExchangeRate = BigInt(0);
    record.timestamp = new Date();
    record.txCount = 0
  }

  return record;
}

export const getExchangeBundle = async (block: string | number, token: string) => {
  const id = `${block}-${token}`

  let record = await ExchangeBundle.get(id);

  if (!record) {
    const exchangeRate = await queryExchangeRate(id)

    record = new ExchangeBundle(id);

    record.collateralId = '';
    record.debitExchangeRate = exchangeRate

    record.save();
  }

  return record
}

export const getPriceBundle = async (token: string, block: SubstrateBlock) => {
  const id = `${block}-${token}`

  let record = await PriceBundle.get(id);

  if (!record) {
    const price = await queryPriceFromOracle(api as any, block, token);

    record = new PriceBundle(id);

    record.collateralId = '';
    record.blockId = '';
    record.price = price.toChainData()

    record.save();
  }

  return record
}

export const getCollateralParams = async (id: string) => {
  let record = await CollateralParams.get(id);

  if (!record) {
    record = new CollateralParams(id);

    record.collateralId = '';
    record.maximumTotalDebitValue = BigInt(0);
    record.interestRatePerSec = BigInt(0);
    record.liquidationRatio = BigInt(0);
    record.liquidationPenalty = BigInt(0);
    record.requiredCollateralRatio = BigInt(0);
    record.updateAtBlockId = '';
    record.updateAt = new Date();
  }

  return record
}

export const getCollateralParamsHistory = async (id: string) => {
  let record = await CollateralParamsHistory.get(id);

  if (!record) {
    record = new CollateralParamsHistory(id);

    record.collateralId = '';
    record.interestRatePerSec = BigInt(0);
    record.liquidationPenalty = BigInt(0);
    record.liquidationRatio = BigInt(0);
    record.maximumTotalDebitValue = BigInt(0);
    record.requiredCollateralRatio = BigInt(0);
    record.startAtBlockId = '';
    record.endAtBlockId = '';
    record.startAt = new Date()
    record.endAt = new Date()
  }

  return record;
}

export const getUpdatePosition = async (id: string) => {
  let record = await UpdatePosition.get(id);

  if (!record) {
    record = new UpdatePosition(id);

    record.senderId = '';
    record.collateralId = '';
    record.blockId = '';
    record.extrinsicId = '';
    record.collateralAdjustment = BigInt(0);
    record.debitAdjustment = BigInt(0);
    record.collateralAdjustmentUSD = BigInt(0);
    record.debitAdjustmentUSD = BigInt(0);
    record.blockId = ''
    record.extrinsicId = ''
    record.timestamp = new Date()
  }

  return record;
}

export const getCloseByDex = async (id: string) => {
  let record = await CloseByDex.get(id);

  if (!record) {
    record = new CloseByDex(id);

    record.collateralId = '';
    record.senderId = '';
    record.soldAmount = BigInt(0);
    record.refundAmount = BigInt(0);
    record.debitVolumeUSD = BigInt(0);
    record.soldVolumeUSD = BigInt(0);
    record.refundVolumeUSD = BigInt(0);
    record.blockId = '';
    record.extrinsicId = '';
    record.timestamp = new Date()
  }

  return record;
}

export const getLiquidUnsafe = async (id: string) => {
  let record = await LiquidUnsafe.get(id);

  if (!record) {
    record = new LiquidUnsafe(id);

    record.collateralId = '';
    record.senderId = '';
    record.ownerId = '';
    record.collateralAmount = BigInt(0);
    record.badDebitVolumeUSD = BigInt(0);
    record.liquidationStrategy = '';
    record.blockId = '';
    record.extrinsicId = '';
    record.timestamp = new Date()
  }

  return record;
}

export const getTransferPosition = async (id: string) => {
  let record = await TransferPosition.get(id);

  if (!record) {
    record = new TransferPosition(id);

    record.senderId = '';
    record.collateralId = '';
    record.fromId = '';
    record.toId = '';
    record.blockId = '';
    record.extrinsicId = '';
    record.timestamp = new Date()
  } else {
    return record;
  }
}

export const getUpdateCollateralParams = async (id: string) => {
  let record = await UpdateCollateralParams.get(id);

  if (!record) {
    record = new UpdateCollateralParams(id);

    record.senderId = '';
    record.collateralId = '';
    record.interestRatePerSec = BigInt(0);
    record.liquidationPenalty = BigInt(0);
    record.liquidationRatio = BigInt(0);
    record.maximumTotalDebitValue = BigInt(0);
    record.requiredCollateralRatio = BigInt(0);
    record.blockId = '';
    record.extrinsicId = '';
    record.timestamp = new Date()
  }

  return record;
}


export const getConfiscatePosition = async (id: string) => {
  let record = await ConfiscatePosition.get(id);

  if (!record) {
    record = new ConfiscatePosition(id);

    record.collateralId = '';
    record.blockId = '';
    record.ownerId = '';
    record.extrinsicId = '';
    record.collateralAdjustment = BigInt(0);
    record.debitAdjustment = BigInt(0);
    record.collateralAdjustmentUSD = BigInt(0);
    record.debitAdjustmentUSD = BigInt(0);
  }

  return record;
}