import { forceToCurrencyName } from "@acala-network/sdk-core";
import { AccountId, Balance, CurrencyId } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { getAccount, getBlock, getCollateral, getCollateralParams, getCollateralParamsHistory, getExtrinsic, getUpdateCollateralParams } from "../utils/record";

const fieldMap = new Map([
  ['InterestRatePerSecUpdated', 'interestRatePerSec'],
  ['LiquidationRatioUpdated', 'liquidationRatio'],
  ['LiquidationPenaltyUpdated', 'liquidationPenalty'],
  ['RequiredCollateralRatioUpdated', 'requiredCollateralRatio'],
  ['MaximumTotalDebitValueUpdated', 'maximumTotalDebitValue']
]);

export const updateParams = async (event: SubstrateEvent) => {
  const [_collateral, amount] = event.event.data as unknown as [AccountId, Balance];
  const collateralName = forceToCurrencyName(_collateral);
  const value = BigInt(amount.toString())
  const updateField = fieldMap.get(event.event.method.toString());
  const collateral = await getCollateral(collateralName);
  const block = await getBlock(event.block)
  const params = await getCollateralParams(collateralName);
  const paramsHistory = await getCollateralParamsHistory(collateral.id, block.id);
  const eventHistory = await getUpdateCollateralParams(`${block.id}-${event.event.index.toString()}`)

  paramsHistory.maximumTotalDebitValue = params.maximumTotalDebitValue;
  paramsHistory.interestRatePerSec = params.interestRatePerSec;
  paramsHistory.liquidationRatio = params.liquidationRatio;
  paramsHistory.liquidationPenalty = params.liquidationPenalty;
  paramsHistory.requiredCollateralRatio = params.requiredCollateralRatio;
  paramsHistory.startAtBlockId = params.updateAtBlockId;
  paramsHistory.startAt = params.updateAt;
  paramsHistory.endAtBlockId = block.id;
  paramsHistory.endAt = block.timestamp;

  if (event.extrinsic) {
    const extrinsic = await getExtrinsic(event.extrinsic);

    eventHistory.senderId = extrinsic.senderId;
    eventHistory.collateralId = collateral.id;
    eventHistory.blockId = block.id;
    eventHistory.extrinsicId = extrinsic.id;
    eventHistory.timestamp = block.timestamp;
  }


  // update params
  params[updateField] = value;
  params.updateAt = block.timestamp;
  params.updateAtBlockId = block.id;

  await paramsHistory.save();
  await params.save();
}