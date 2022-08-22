import { FixedPointNumber, getCurrencyObject } from "@acala-network/sdk-core";
import { getTokenDecimals, queryPriceFromOracle } from "@acala-network/subql-utils";
import { Option } from "@polkadot/types"
import { SubstrateBlock, SubstrateExtrinsic } from "@subql/types";
import { queryExchangeRate } from ".";
import {
  Account, Collateral, Block, CollateralParams,
  CollateralParamsHistory,
  DailyCollateral,
  DailyPosition,
  ExchangeBundle,
  Extrinsic,
  HourlyCollateral,
  HourlyPosition,
  LiquidUnsafe,
  Position,
  PriceBundle,
  TransferPosition,
  UpdatePosition,
  ConfiscatePosition,
  CloseByDex,
} from "../types";
import { getDebitPool } from './getDebitPool';

export const getBlock = async (block: SubstrateBlock) => {
  const id = block.block.header.number.toString();

  let record = await Block.get(id);

  if (!record) {
    // to ensure block 1 is exist
    await getBlockOne();

    record = new Block(id);

    record.hash = block.hash.toString();
    record.number = BigInt(id);
    record.timestamp = block.timestamp;
    record.debitPool = await getDebitPool();

    // never change after save
    await record.save()
  }

  return record;
}

export const getBlockOne = async () => {
  const id = '1';

  let record = await Block.get(id);

  if (!record) {
    record = new Block(id);

    record.hash = '';
    record.number = BigInt(id);
    record.timestamp = new Date('0');

    // never change after save
    await record.save()
  }

  return record;
}

export const getExtrinsic = async (extrinsic: SubstrateExtrinsic) => {
  const id = extrinsic.extrinsic.hash.toString();

  let record = await Extrinsic.get(id);

  if (!record) {
    record = new Extrinsic(id);

    const sender = await getAccount(extrinsic.extrinsic.signer.toString());

    record.hash = id
    record.blockId = extrinsic.block.block.header.number.toString();
    record.method = extrinsic.extrinsic.method.method;
    record.section = extrinsic.extrinsic.method.section;
    record.senderId = sender.id;
    record.raw = extrinsic.extrinsic.toHex();

    await record.save()
  }

  return record;
}

export const getAccount = async (address: string) => {
  let record = await Account.get(address);

  if (!record) {
    record = new Account(address);

    record.address = address;
    record.txCount = 0;

    await record.save();
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

    await record.save()
  }

  return record;
}

export const getHourlyCollateral = async (collateral: string, timestamp: Date) => {
  const id = `${collateral}-${timestamp.getTime()}`;

  let record = await HourlyCollateral.get(id);

  if (!record) {
    record = new HourlyCollateral(id);

    record.collateralId = collateral;
    record.depositAmount = BigInt(0);
    record.debitAmount = BigInt(0);
    record.depositVolumeUSD = BigInt(0);
    record.debitVolumeUSD = BigInt(0);
    record.depositChanged = BigInt(0);
    record.debitChanged = BigInt(0);
    record.depositChangedUSD = BigInt(0);
    record.debitChangedUSD = BigInt(0);
    record.debitExchangeRate = BigInt(0);
    record.txCount = 0
    record.timestamp = timestamp;
  }

  return record;
}

export const getDailyCollateral = async (collateral: string, timestamp: Date) => {
  const id = `${collateral}-${timestamp.getTime()}`;

  let record = await DailyCollateral.get(id);

  if (!record) {
    record = new DailyCollateral(id);

    record.collateralId = collateral;
    record.debitAmount = BigInt(0);
    record.depositAmount = BigInt(0);
    record.debitVolumeUSD = BigInt(0);
    record.depositVolumeUSD = BigInt(0);
    record.depositChanged = BigInt(0);
    record.debitChanged = BigInt(0);
    record.depositChangedUSD = BigInt(0);
    record.debitChangedUSD = BigInt(0);
    record.debitExchangeRate = BigInt(0);
    record.timestamp = timestamp;
    record.txCount = 0;
  }

  return record;
}

export const getPosition = async (collateral: string, owner: string) => {
  const id = `${collateral}-${owner}`;
  let record = await Position.get(id);

  if (!record) {
    record = new Position(id);

    record.collateralId = collateral;
    record.ownerId = owner;
    record.depositAmount = BigInt(0);
    record.debitAmount = BigInt(0);
    record.updateAt = new Date();
    record.txCount = 0;
    record.updateAtBlockId = '';
  }

  return record;
}

export const getHourlyPosition = async (collateral: string, owner: string, timestamp: Date) => {
  const id = `${collateral}-${owner}-${timestamp.getTime()}`;

  let record = await HourlyPosition.get(id);

  if (!record) {
    record = new HourlyPosition(id);

    record.collateralId = collateral;
    record.ownerId = owner;
    record.depositAmount = BigInt(0);
    record.debitAmount = BigInt(0);
    record.depositVolumeUSD = BigInt(0);
    record.debitVolumeUSD = BigInt(0);
    record.depositChanged = BigInt(0);
    record.debitChanged = BigInt(0);
    record.depositChangedUSD = BigInt(0);
    record.debitChangedUSD = BigInt(0);
    record.debitExchangeRate = BigInt(0);
    record.txCount = 0;
    record.timestamp = timestamp;
  }

  return record;
}

export const getDailyPosition = async (collateral: string, owner: string, timestamp: Date) => {
  const id = `${collateral}-${owner}-${timestamp.getTime()}`;
  let record = await DailyPosition.get(id);

  if (!record) {
    record = new DailyPosition(id);

    record.collateralId = collateral;
    record.ownerId = owner;
    record.depositAmount = BigInt(0);
    record.debitAmount = BigInt(0);
    record.depositVolumeUSD = BigInt(0);
    record.debitVolumeUSD = BigInt(0);
    record.depositChanged = BigInt(0);
    record.debitChanged = BigInt(0);
    record.depositChangedUSD = BigInt(0);
    record.debitChangedUSD = BigInt(0);
    record.debitExchangeRate = BigInt(0);
    record.timestamp = timestamp;
    record.txCount = 0
  }

  return record;
}

export const getExchangeBundle = async (token: string, block: SubstrateBlock) => {
  const id = `${block.block.header.number.toString()}-${token}`

  let record = await ExchangeBundle.get(id);

  if (!record) {
    const exchangeRate = await queryExchangeRate(token)

    record = new ExchangeBundle(id);

    record.collateralId = token;
    record.debitExchangeRate = exchangeRate;
    record.blockId = block.block.header.number.toString();

    await record.save();
  }

  return record
}

export const getPriceBundle = async (token: string, block: SubstrateBlock) => {
  const id = `${block.block.header.number.toString()}-${token}`

  let record = await PriceBundle.get(id);

  if (!record) {
    const price = await queryPriceFromOracle(api as any, block, token)
      .catch(() => Promise.resolve(FixedPointNumber.ZERO));

    record = new PriceBundle(id);

    record.collateralId = token
    record.blockId = block.block.header.number.toString();
    record.price = BigInt((price || FixedPointNumber.ZERO).toChainData())

    await record.save();
  }

  return record
}

export const getCollateralParams = async (id: string) => {
  let record = await CollateralParams.get(id);

  if (!record) {
    record = new CollateralParams(id);

    const params = await api.query.cdpEngine.collateralParams(getCurrencyObject(id)) as any;
    record.collateralId = id;
    record.maximumTotalDebitValue = BigInt(params?.maximumTotalDebitValue?.toString() || params.unwrapOrDefault().maximumTotalDebitValue.toString());
    record.interestRatePerSec = BigInt(params?.interestRatePerSec?.toString() || params.unwrapOrDefault().interestRatePerSec.toString());
    record.liquidationRatio = BigInt(params?.liquidationRatio?.toString() || params.unwrapOrDefault().liquidationRatio.toString());
    record.liquidationPenalty = BigInt(params?.liquidationPenalty?.toString() || params.unwrapOrDefault().liquidationPenalty.toString());
    record.requiredCollateralRatio = BigInt(params?.requiredCollateralRatio?.toString() || params.unwrapOrDefault().requiredCollateralRatio.toString());
    record.updateAtBlockId = '1';
    record.updateAt = new Date(0);
  }

  return record
}

export const getCollateralParamsHistory = async (collateral: string, block: string | number) => {
  const id = `${block}-${collateral}`;
  let record = await CollateralParamsHistory.get(id);

  if (!record) {
    record = new CollateralParamsHistory(id);

    record.collateralId = collateral;
    record.interestRatePerSec = BigInt(0);
    record.liquidationPenalty = BigInt(0);
    record.liquidationRatio = BigInt(0);
    record.maximumTotalDebitValue = BigInt(0);
    record.requiredCollateralRatio = BigInt(0);
    record.startAtBlockId = '';
    record.endAtBlockId = '';
    record.startAt = new Date(0)
    record.endAt = new Date(0)
  }

  return record;
}

export const getUpdatePosition = async (id: string) => {
  let record = await UpdatePosition.get(id);

  if (!record) {
    record = new UpdatePosition(id);

    record.ownerId = '';
    record.collateralId = '';
    record.blockId = '1';
    record.collateralAdjustment = BigInt(0);
    record.debitAdjustment = BigInt(0);
    record.collateralAdjustmentUSD = BigInt(0);
    record.debitAdjustmentUSD = BigInt(0);
    record.price = BigInt(0);
    record.debitExchangeRate = BigInt(0)
    record.timestamp = new Date(0)
  }

  return record;
}

export const getCloseByDex = async (id: string) => {
  let record = await CloseByDex.get(id);

  if (!record) {
    record = new CloseByDex(id);

    record.collateralId = '';
    record.soldAmount = BigInt(0);
    record.refundAmount = BigInt(0);
    record.debitVolumeUSD = BigInt(0);
    record.soldVolumeUSD = BigInt(0);
    record.refundVolumeUSD = BigInt(0);
    record.blockId = '1';
    record.extrinsicId = '';
    record.price = BigInt(0);
    record.debitExchangeRate = BigInt(0)
    record.timestamp = new Date(0)
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
    record.blockId = '1';
    record.extrinsicId = '';
    record.price = BigInt(0);
    record.debitExchangeRate = BigInt(0)
    record.timestamp = new Date(0)
  }

  return record;
}

export const getTransferPosition = async (id: string) => {
  let record = await TransferPosition.get(id);

  if (!record) {
    record = new TransferPosition(id);

    record.collateralId = '';
    record.fromId = '';
    record.toId = '';
    record.blockId = '1';
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
    record.blockId = '1';
    record.ownerId = '';
    record.extrinsicId = '';
    record.collateralAdjustment = BigInt(0);
    record.debitAdjustment = BigInt(0);
    record.collateralAdjustmentUSD = BigInt(0);
    record.debitAdjustmentUSD = BigInt(0);
  }

  return record;
}