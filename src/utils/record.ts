import { getTokenDecimals } from ".";
import {
  Account, Collateral, Block, CollateralParams,
  CollateralParamsHistory,
  DailyCollateral,
  DailyPosition,
  ExchangeBoundle,
  Extrinsic,
  HourCollateral,
  HourPosition,
  LiquidUnsafe,
  Position,
  PriceBoundle,
  TransferPosition,
  UpdateCollateralParams,
  UpdatePosition,
  ConfiscatePosition,
  CloseByDex,
} from "../types";

export const getAccount = async (address: string) => {
  const _account = await Account.get(address);
  if (!_account) {
    const newAccount = new Account(address);
    newAccount.address = address;
    newAccount.txCount = BigInt(0);
    await newAccount.save();
    return newAccount;
  } else {
    return _account;
  }
}

export const getBlock = async (id: string) => {
  const _block = await Block.get(id);
  if (!_block) {
    const newBlock = new Block(id);
    newBlock.hash = '';
    newBlock.number = BigInt(0);
    newBlock.timestamp = new Date();
    await newBlock.save();
    return newBlock;
  } else {
    return _block;
  }
}

export const getCloseByDex = async (id: string) => {
  const record = await CloseByDex.get(id);

  if (!record) {
    const newRecord = new CloseByDex(id);

    newRecord.collateralId = '';
    newRecord.ownerId = '';
    newRecord.soldVolume = BigInt(0);
    newRecord.refundVolume = BigInt(0);
    newRecord.debitVolumeUSD = BigInt(0);
    newRecord.soldVolumeUSD = BigInt(0);
    newRecord.refundVolumeUSD = BigInt(0);
    newRecord.blockId = '';
    newRecord.extrinsicId = '';

    return newRecord;
  } else {
    return record;
  }
}

export const getCollateral = async (token: string) => {
  const _collateral = await Collateral.get(token);
  const decimals = await getTokenDecimals(api as any, token);
  if (!_collateral) {
    const newCollateral = new Collateral(token);
    newCollateral.name = token;
    newCollateral.decimals = decimals;
    newCollateral.totalDepositVolume = BigInt(0);
    newCollateral.totalDebitVolume = BigInt(0);
    newCollateral.txCount = 0;
    await newCollateral.save();
    return newCollateral;
  } else {
    return _collateral;
  }
}

export const getCollateralParams = async (id: string) => {
  const record = await CollateralParams.get(id);

  if (!record) {
    const newRecord = new CollateralParams(id);

    newRecord.collateralId = '';
    newRecord.maximumTotalDebitValue = BigInt(0);
    newRecord.interestRatePerSec = BigInt(0);
    newRecord.liquidationRatio = BigInt(0);
    newRecord.liquidationPenalty = BigInt(0);
    newRecord.requiredCollateralRatio = BigInt(0);
    newRecord.updateAtId = '';

    return {
      isExist: false,
      record: newRecord
    };
  } else {
    return {
      isExist: true,
      record: record
    };
  }
}

export const getCollateralParamsHistory = async (id: string) => {
  const record = await CollateralParamsHistory.get(id);

  if (!record) {
    const newRecord = new CollateralParamsHistory(id);

    newRecord.collateralId = '';
    newRecord.interestRatePerSec = BigInt(0);
    newRecord.liquidationPenalty = BigInt(0);
    newRecord.liquidationRatio = BigInt(0);
    newRecord.maximumTotalDebitValue = BigInt(0);
    newRecord.requiredCollateralRatio = BigInt(0);
    newRecord.startAtBlockId = '';
    newRecord.endAtBlockId = '';

    return newRecord;
  } else {
    return record;
  }
}

export const getDailyCollateral = async (id: string) => {
  const record = await DailyCollateral.get(id);

  if (!record) {
    const newRecord = new DailyCollateral(id);

    newRecord.collateralId = '';
    newRecord.debitVolume = BigInt(0);
    newRecord.depositVolume = BigInt(0);
    newRecord.totalDebitVolumeUSD = BigInt(0);
    newRecord.totalDepositVolumeUSD = BigInt(0);
    newRecord.debitExchangeRate = BigInt(0);
    newRecord.timestamp = new Date();
    newRecord.txCount = BigInt(0);

    return newRecord;
  } else {
    return record;
  }
}

export const getDailyPosition = async (id: string) => {
  const record = await DailyPosition.get(id);

  if (!record) {
    const newRecord = new DailyPosition(id);

    newRecord.collateralId = '';
    newRecord.ownerId = '';
    newRecord.debitVolume = BigInt(0);
    newRecord.depositVolume = BigInt(0);
    newRecord.depositVolumeUSD = BigInt(0);
    newRecord.debitVolumeUSD = BigInt(0);
    newRecord.debitExchangeRate = BigInt(0);
    newRecord.timestamp = new Date();
    newRecord.txCount = BigInt(0);

    return newRecord;
  } else {
    return record;
  }
}

export const getExchangeBoundle = async (id: string) => {
  const record = await ExchangeBoundle.get(id);

  if (!record) {
    const newRecord = new ExchangeBoundle(id);

    newRecord.collateralId = '';
    newRecord.debitExchangeRate = BigInt(0);

    return {
      isExist: false,
      record: newRecord
    };
  } else {
    return {
      isExist: true,
      record: record
    };
  }
}

export const getExtrinsic = async (id: string) => {
  const record = await Extrinsic.get(id);

  if (!record) {
    const newRecord = new Extrinsic(id);

    newRecord.hash = '';
    newRecord.blockId = '';
    return newRecord;
  } else {
    return record;
  }
}

export const getHourCollateral = async (id: string) => {
  const record = await HourCollateral.get(id);

  if (!record) {
    const newRecord = new HourCollateral(id);

    newRecord.collateralId = '';
    newRecord.depositVolume = BigInt(0);
    newRecord.debitVolume = BigInt(0);
    newRecord.totalDepositVolumeUSD = BigInt(0);
    newRecord.totalDebitVolumeUSD = BigInt(0);
    newRecord.debitExchangeRate = BigInt(0);
    newRecord.txCount = BigInt(0);
    newRecord.timestamp = new Date();

    return newRecord;
  } else {
    return record;
  }
}

export const getHourPosition = async (id: string) => {
  const record = await HourPosition.get(id);

  if (!record) {
    const newRecord = new HourPosition(id);

    newRecord.collateralId = '';
    newRecord.depositVolume = BigInt(0);
    newRecord.debitVolume = BigInt(0);
    newRecord.depositVolumeUSD = BigInt(0);
    newRecord.debitVolumeUSD = BigInt(0);
    newRecord.debitExchangeRate = BigInt(0);
    newRecord.txCount = BigInt(0);
    newRecord.timestamp = new Date();

    return newRecord;
  } else {
    return record;
  }
}

export const getLiquidUnsafe = async (id: string) => {
  const record = await LiquidUnsafe.get(id);

  if (!record) {
    const newRecord = new LiquidUnsafe(id);

    newRecord.collateralId = '';
    newRecord.ownerId = '';
    newRecord.collateralVolume = BigInt(0);
    newRecord.badDebitVolumeUSD = BigInt(0);
    newRecord.liquidationStrategy = '';
    newRecord.blockId = '';
    newRecord.extrinsicId = '';

    return newRecord;
  } else {
    return record;
  }
}

export const getPosition = async (id: string) => {
  const record = await Position.get(id);

  if (!record) {
    const newRecord = new Position(id);

    newRecord.collateralId = '';
    newRecord.ownerId = '';
    newRecord.depositVolume = BigInt(0);
    newRecord.debitVolume = BigInt(0);
    newRecord.updateAtId = '';

    return newRecord;
  } else {
    return record;
  }
}

export const getPriceBoundle = async (id: string) => {
  const record = await PriceBoundle.get(id);

  if (!record) {
    const newRecord = new PriceBoundle(id);

    newRecord.collateralId = '';
    newRecord.blockId = '';
    newRecord.price = '0';

    return {
      isExist: false,
      record: newRecord
    };
  } else {
    return {
      isExist: true,
      record: record
    };
  }
}

export const getTransferPosition = async (id: string) => {
  const record = await TransferPosition.get(id);

  if (!record) {
    const newRecord = new TransferPosition(id);

    newRecord.collateralId = '';
    newRecord.blockId = '';
    newRecord.fromId = '';
    newRecord.toId = '';
    newRecord.extrinsicId = '';

    return newRecord;
  } else {
    return record;
  }
}

export const getUpdateCollateralParams = async (id: string) => {
  const record = await UpdateCollateralParams.get(id);

  if (!record) {
    const newRecord = new UpdateCollateralParams(id);

    newRecord.collateralId = '';
    newRecord.interestRatePerSec = BigInt(0);
    newRecord.liquidationPenalty = BigInt(0);
    newRecord.liquidationRatio = BigInt(0);
    newRecord.maximumTotalDebitValue = BigInt(0);
    newRecord.requiredCollateralRatio = BigInt(0);
    newRecord.blockId = '';
    newRecord.extrinsicId = '';

    return newRecord;
  } else {
    return record;
  }
}

export const getUpdatePosition = async (id: string) => {
  const record = await UpdatePosition.get(id);

  if (!record) {
    const newRecord = new UpdatePosition(id);

    newRecord.collateralId = '';
    newRecord.blockId = '';
    newRecord.ownerId = '';
    newRecord.extrinsicId = '';
    newRecord.collateralAjustment = BigInt(0);
    newRecord.debitAjustment = BigInt(0);
    newRecord.collateralAjustmentUSD = BigInt(0);
    newRecord.debitAjustmentUSD = BigInt(0);

    return newRecord;
  } else {
    return record;
  }
}

export const getConfiscatePosition = async (id: string) => {
  const record = await ConfiscatePosition.get(id);

  if (!record) {
    const newRecord = new ConfiscatePosition(id);

    newRecord.collateralId = '';
    newRecord.blockId = '';
    newRecord.ownerId = '';
    newRecord.extrinsicId = '';
    newRecord.collateralAjustment = BigInt(0);
    newRecord.debitAjustment = BigInt(0);
    newRecord.collateralAjustmentUSD = BigInt(0);
    newRecord.debitAjustmentUSD = BigInt(0);

    return newRecord;
  } else {
    return record;
  }
}