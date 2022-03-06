import { forceToCurrencyName } from "@acala-network/sdk-core";
import { AccountId, Balance, CurrencyId } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { getBlock, getCollateral, getCollateralParams, getCollateralParamsHistory } from "../utils/record";

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

  paramsHistory[updateField] = params[updateField];
  paramsHistory.endAtBlockId = block.id;
  paramsHistory.endAt = block.timestamp;

  if (!paramsHistory.startAtBlockId) {
    paramsHistory.startAtBlockId = params.updateAtBlockId;
    paramsHistory.startAt = params.updateAt;
  }

  // update params
  params[updateField] = value;
  params.updateAt = block.timestamp;
  params.updateAtBlockId = block.id;

  await paramsHistory.save();
  await params.save();
}