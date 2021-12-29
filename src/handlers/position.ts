import { FixedPointNumber as FN, forceToCurrencyIdName } from "@acala-network/sdk-core";
import { SubstrateEvent } from "@subql/types"
import { getDateStartOfDay, getDateStartOfHour } from '../utils/date';
import { getAccount, getCollateral, getDailyGlobalPosition, getDailyLoanPosition, getGlobalLoanPosition, getHourGolbalPosition, getHourLoanPosition, getLoanHistory, getLoanPosition } from "../utils/record";
import { getExchangeRateFromDb, getKVData, mapUpdateKVData, queryPrice } from "../utils";
import { updateParams } from "./params";

export const updateLoanPosition = async (event: SubstrateEvent, isLiquidatiton = false) => {
  const [account, collateral, collateral_amount, debit_amount] = event.event.data;

  const accountData = await getAccount(account.toString());
  const tokenData = await getCollateral(forceToCurrencyIdName(collateral));
  const price = await queryPrice(forceToCurrencyIdName(collateral));
  
  const owner = accountData.id;
  const token = tokenData.id;
  const collateralAmount = isLiquidatiton ? -BigInt(collateral_amount.toString()) : BigInt(collateral_amount.toString());
  const debitAmount = isLiquidatiton ? -BigInt(debit_amount.toString()) : BigInt(debit_amount.toString());
  const collateralVolume = FN.fromInner(collateral_amount.toString(), 12).times(price).toChainData();
  const debitVolume = FN.fromInner(debit_amount.toString(), 12).times(price).toChainData();
  const exchangeRate = await getExchangeRateFromDb(BigInt(event.block.block.header.number.toString()), collateral);

  // loanposition personal part
  const positionId = `${owner}-${token}`;
  const position = await getLoanPosition(positionId);

  position.collateralAmount = position.collateralAmount + collateralAmount
  position.debitAmount = position.debitAmount + debitAmount
  position.ownerId = owner;
  position.collateralId = token;

  // loanposition global part
  const globalPositionId = token;
  const globalPosition = await getGlobalLoanPosition(globalPositionId);

  globalPosition.collateralAmount = globalPosition.collateralAmount + collateralAmount
  globalPosition.debitAmount = globalPosition.debitAmount + debitAmount
  globalPosition.collateralId = token;


  const hourTimeKey = getDateStartOfHour(event.block.timestamp).toDate();
  // hourloanposition personal part
  const hourPositionId = `${owner}-${token}-${hourTimeKey.getTime()}`;
  const hourPosition = await getHourLoanPosition(hourPositionId);
  hourPosition.collateralAmount = position.collateralAmount;
  hourPosition.debitAmount = position.debitAmount;
  hourPosition.ownerId = owner;
  hourPosition.timestamp = hourTimeKey;
  hourPosition.debitExchangeRate = exchangeRate;
  hourPosition.collateralId = token;

  // hourloanposition global part
  const globalHourPositionId = `${token}-${hourTimeKey.getTime()}`;
  const hourGlobalPosition = await getHourGolbalPosition(globalHourPositionId);

  hourGlobalPosition.collateralAmount = globalPosition.collateralAmount;
  hourGlobalPosition.debitAmount = globalPosition.debitAmount;
  hourGlobalPosition.timestamp = hourTimeKey;
  hourGlobalPosition.debitExchangeRate = exchangeRate;
  hourGlobalPosition.collateralId = token;
  hourGlobalPosition.txCount = hourGlobalPosition.txCount + BigInt(1);
  hourGlobalPosition.collateralVolume = hourGlobalPosition.collateralVolume + BigInt(collateralVolume);
  hourGlobalPosition.debitVolume = hourGlobalPosition.debitVolume + BigInt(debitVolume);


  const dailyTimeKey = getDateStartOfDay(event.block.timestamp).toDate();
  // personal part
  const dailyPositionId = `${owner}-${token}-${dailyTimeKey.getTime()}`;
  const dailyPosition = await getDailyLoanPosition(dailyPositionId);

  dailyPosition.collateralAmount = position.collateralAmount
  dailyPosition.debitAmount = position.debitAmount;
  dailyPosition.ownerId = owner;
  dailyPosition.timestamp = dailyTimeKey;
  dailyPosition.debitExchangeRate = exchangeRate;
  dailyPosition.collateralId = token;

  // global part
  const dailyGlobalPositionId = `${token}-${dailyTimeKey.getTime()}`;
  const dailyGlobalPosition = await getDailyGlobalPosition(dailyGlobalPositionId)

  dailyGlobalPosition.collateralAmount = globalPosition.collateralAmount
  dailyGlobalPosition.debitAmount = globalPosition.debitAmount
  dailyGlobalPosition.collateralId = token;
  dailyGlobalPosition.debitExchangeRate = exchangeRate;
  dailyGlobalPosition.timestamp = dailyTimeKey;
  dailyGlobalPosition.txCount = dailyGlobalPosition.txCount + BigInt(1);
  dailyGlobalPosition.collateralVolume = dailyGlobalPosition.collateralVolume + BigInt(collateralVolume);
  dailyGlobalPosition.debitVolume = dailyGlobalPosition.debitVolume + BigInt(debitVolume);

  const historyId = `${event.block.block.hash.toString()}-${event.idx.toString()}`
  const history = await getLoanHistory(historyId);

  history.ownerId = owner;
  history.collateralId = token;
  history.type = event.event.method.toString();
  history.collateralAjustment = collateralAmount;
  history.debitAjustment = debitAmount;
  history.atBlock = BigInt(event.block.block.header.number.toString());
  history.atBlockHash = event.block.block.hash.toString();
  history.atExtrinsicHash = event.extrinsic.extrinsic.hash.toString();
  history.timestamp = event.block.timestamp;

  const keyArray = [
    { key: 'owner' },
    { key: 'collateral' },
    { key: 'collateralAdjustment' },
    { key: 'debitAdjustment' }
  ];
  history.data = mapUpdateKVData(getKVData(event.event.data), keyArray)

  await position.save();
  await globalPosition.save();
  await hourPosition.save();
  await hourGlobalPosition.save();
  await dailyPosition.save();
  await dailyGlobalPosition.save();
  await history.save();
  await updateParams(event, 'loans');
}