import { Rate, OptionRate } from "@acala-network/types/interfaces";
import { forceToCurrencyId } from "@acala-network/sdk-core";

export async function queryExchangeRate (token: any) {
  const debitExchangeRate = (await api.query.cdpEngine.debitExchangeRate(forceToCurrencyId(api as any, token))) as unknown as OptionRate;
  const globalExchangeRate = api.consts.cdpEngine.defaultDebitExchangeRate as unknown as Rate;

  return debitExchangeRate.isNone ? BigInt(globalExchangeRate.toString()) : BigInt(debitExchangeRate.unwrapOrDefault().toString());
}