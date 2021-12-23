import { Rate, OptionRate } from "@acala-network/types/interfaces";
import { forceToCurrencyIdName } from "@acala-network/sdk-core";
import { getExchangeRate } from "./record";

export const getExchangeRateFromDb = async (block: bigint, token: any) => {

  const { isExist, record } = await getExchangeRate(`${block.toString()}-${forceToCurrencyIdName(token)}`);

  if(isExist) {
    return record.debitExchangeRate;
  } else {
    const debitExchangeRate = (await api.query.cdpEngine.debitExchangeRate(token)) as unknown as OptionRate;
    const globalExchangeRate = api.consts.cdpEngine.defaultDebitExchangeRate as unknown as Rate;
    const exchangeRate = debitExchangeRate.isNone ? BigInt(globalExchangeRate.toString()) : BigInt(debitExchangeRate.unwrapOrDefault().toString());

    record.collateralId = forceToCurrencyIdName(token);
    record.debitExchangeRate = exchangeRate;
    record.block = block;
    await record.save();

    return exchangeRate;
  }
}