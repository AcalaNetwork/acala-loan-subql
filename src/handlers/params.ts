import { SubstrateEvent } from "@subql/types";
import { ensureBlock, ensureExtrinsic } from ".";
import { getCollateral, getCollateralParams, getCollateralParamsHistory, getUpdateCollateralParams } from "../utils";

export const updateTokenParams = async (event: SubstrateEvent, token: string, field: string, value: bigint) => {
  const { isExist, record: CollateralParamsNow } = await getCollateralParams(token);
  const blockData = await ensureBlock(event);
  const historyId = `${blockData.number}-${token}`;

  if (isExist) {
    const history = await getCollateralParamsHistory(historyId);
    history.startAtBlockId = CollateralParamsNow.updateAtId;
    history.endAtBlockId = blockData.number.toString();
    history.maximumTotalDebitValue = CollateralParamsNow.maximumTotalDebitValue;
    history.interestRatePerSec = CollateralParamsNow.interestRatePerSec;
    history.liquidationRatio = CollateralParamsNow.liquidationRatio;
    history.liquidationPenalty = CollateralParamsNow.liquidationPenalty;
    history.requiredCollateralRatio = CollateralParamsNow.requiredCollateralRatio;

    CollateralParamsNow[field] = value;
    CollateralParamsNow.updateAtId = blockData.number.toString();

    await history.save();
    await CollateralParamsNow.save();
    await createUpdateCollateralParamsHistory(event, token, CollateralParamsNow.maximumTotalDebitValue, CollateralParamsNow.interestRatePerSec, CollateralParamsNow.liquidationRatio, CollateralParamsNow.liquidationPenalty, CollateralParamsNow.requiredCollateralRatio);
  } else {
    const globalInterestRatePerSec = await api.query.cdpEngine.globalInterestRatePerSec();
    const params = await api.query.cdpEngine.collateralParams({ Token: token });
    const defaultLiquidationRatio = await api.consts.cdpEngine.defaultLiquidationRatio;
    const defaultLiquidationPenalty = await api.consts.cdpEngine.defaultLiquidationPenalty;
    CollateralParamsNow.collateralId = token;
    CollateralParamsNow.updateAtId = blockData.number.toString();
    CollateralParamsNow.maximumTotalDebitValue = BigInt((params as any ).maximumTotalDebitValue.toString());
    CollateralParamsNow.interestRatePerSec = BigInt((params as any).interestRatePerSec.toString()) + BigInt(globalInterestRatePerSec.toString());
    CollateralParamsNow.liquidationRatio = (params as any).liquidationRatio ? BigInt((params as any).liquidationRatio.toString()) : BigInt(defaultLiquidationRatio.toString());
    CollateralParamsNow.liquidationPenalty = (params as any).liquidationPenalty ? BigInt((params as any).liquidationPenalty.toString()) : BigInt(defaultLiquidationPenalty.toString());
    CollateralParamsNow.requiredCollateralRatio = BigInt((params as any).requiredCollateralRatio.toString());

    await CollateralParamsNow.save();
    await createUpdateCollateralParamsHistory(event, token, CollateralParamsNow.maximumTotalDebitValue, CollateralParamsNow.interestRatePerSec, CollateralParamsNow.liquidationRatio, CollateralParamsNow.liquidationPenalty, CollateralParamsNow.requiredCollateralRatio);
  }
}

export const createUpdateCollateralParamsHistory = async (event: SubstrateEvent, token: string, maximumTotalDebitValue: bigint, interestRatePerSec: bigint, liquidationRatio: bigint, liquidationPenalty: bigint, requiredCollateralRatio: bigint) => {
  const blockData = await ensureBlock(event);
  const extrinshcData = await ensureExtrinsic(event);

  await getCollateral(token);

  const id = `${blockData.hash}-${token}`;
  const history = await getUpdateCollateralParams(id);
  history.collateralId = token;
  history.maximumTotalDebitValue = maximumTotalDebitValue;
  history.interestRatePerSec = interestRatePerSec;
  history.liquidationPenalty = liquidationPenalty;
  history.liquidationRatio = liquidationRatio;
  history.requiredCollateralRatio = requiredCollateralRatio;
  history.blockId = blockData.id;
  history.extrinsicId = extrinshcData.id;

  await history.save();
}