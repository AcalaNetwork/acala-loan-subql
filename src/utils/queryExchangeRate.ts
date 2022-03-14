import { forceToCurrencyName, getCurrencyObject } from "@acala-network/sdk-core";
import { Rate, OptionRate } from "@acala-network/types/interfaces";

export async function queryExchangeRate (token: any) {
  const name = forceToCurrencyName(token);
  const debitExchangeRate = (await api.query.cdpEngine.debitExchangeRate(getCurrencyObject(name))) as unknown as OptionRate;
  const globalExchangeRate = api.consts.cdpEngine.defaultDebitExchangeRate as unknown as Rate;

  return debitExchangeRate.isNone ? BigInt(globalExchangeRate.toString()) : BigInt(debitExchangeRate.unwrapOrDefault().toString());
}