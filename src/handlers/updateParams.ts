import { forceToCurrencyIdName } from "@acala-network/sdk-core";
import { AccountId, Balance, CurrencyId } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { getCollateral } from "../utils/record";
import { updateTokenParams } from "./params";

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
    const [token, amount] = event.event.data as unknown as [AccountId, Balance];
    tokenName = (token.toJSON() as any).token;
    value = BigInt(amount.toString())
  } else if(module === 'loans') {
    const [account, collateral] = event.event.data as unknown as [AccountId, CurrencyId];
    tokenName = forceToCurrencyIdName(collateral);
  } else return;
  const method = event.event.method.toString();

  await getCollateral(tokenName);
  
  await updateTokenParams(event, tokenName, fieldMap.get(method), value);

}