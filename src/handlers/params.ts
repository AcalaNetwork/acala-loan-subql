/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { forceToCurrencyIdName } from "@acala-network/sdk-core";
import { SubstrateEvent } from "@subql/types";
import { getCollateral, getCollateralParams, getCollateralParamsHistory } from "../utils/record";

const fieldMap = new Map([
  ['InterestRatePerSecUpdated', 'interestRatePerSec'],
  ['LiquidationRatioUpdated', 'liquidationRatio'],
  ['LiquidationPenaltyUpdated', 'liquidationPenalty'],
  ['RequiredCollateralRatioUpdated', 'requiredCollateralRatio'],
  ['MaximumTotalDebitValueUpdated', 'maximumTotalDebitValue']
]);

export const updateParams = async (event: SubstrateEvent, module: 'cdp' | 'loans') => {
  let tokenName = '';
  let value = BigInt(0);

  if(module === 'cdp') {
    const [token, amount] = event.event.data;
    tokenName = (token.toJSON() as any).token;
    value = BigInt(amount.toString())
  } else if(module === 'loans') {
    const [account, collateral] = event.event.data;
    tokenName = forceToCurrencyIdName(collateral);
  } else return;
  const method = event.event.method.toString();
  const height = event.block.block.header.number.toString();

  await getCollateral(tokenName);
  const record = await getCollateralParams(tokenName);

  if (!record.isExist) {
    const params = await api.query.cdpEngine.collateralParams({ Token: tokenName });
    const defaultLiquidationRatio = await api.consts.cdpEngine.defaultLiquidationRatio;
    const defaultLiquidationPenalty = await api.consts.cdpEngine.defaultLiquidationPenalty;
    const newRecord = record.record;
    newRecord.collateralId = tokenName;
    newRecord.maximumTotalDebitValue = BigInt((params as any ).maximumTotalDebitValue.toString());
    newRecord.interestRatePerSec = BigInt((params as any).interestRatePerSec.toString());
    newRecord.liquidationRatio = (params as any).liquidationRatio ? BigInt((params as any).liquidationRatio.toString()) : BigInt(defaultLiquidationRatio.toString());
    newRecord.liquidationPenalty = (params as any).liquidationPenalty ? BigInt((params as any).liquidationPenalty.toString()) : BigInt(defaultLiquidationPenalty.toString());
    newRecord.requiredCollateralRatio = BigInt((params as any).requiredCollateralRatio.toString());

    await newRecord.save();
  } else {
    const field = fieldMap.get(method);
    if(!field) return;
  
    const newParams = await getCollateralParamsHistory(`${height}-${tokenName}`);
    newParams.endAtBlock = BigInt(height);
    newParams.collateralId = record.record.collateralId;
    newParams.maximumTotalDebitValue = record.record.maximumTotalDebitValue;
    newParams.interestRatePerSec = record.record.interestRatePerSec;
    newParams.liquidationRatio = record.record.liquidationRatio;
    newParams.liquidationPenalty = record.record.liquidationPenalty;
    newParams.requiredCollateralRatio = record.record.requiredCollateralRatio;
    newParams[field] = BigInt(value);

    record.record[field] = BigInt(value);
  
    await record.record.save();
    await newParams.save();
  }
}