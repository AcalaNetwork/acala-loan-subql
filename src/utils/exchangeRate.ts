import { Rate, OptionRate, CurrencyId } from "@acala-network/types/interfaces";
import { forceToCurrencyName } from "@acala-network/sdk-core";
import { getExchangeBoundle } from "./record";
import { Block } from "../types";

export const getExchangeRateFromDb = async (block: Block, token: CurrencyId) => {
  const tokenName = forceToCurrencyName(token);
  const { isExist, record } = await getExchangeBoundle(`${block.number.toString()}-${tokenName}`);

  if(isExist) {
    return record.debitExchangeRate;
  } else {
    const debitExchangeRate = (await api.query.cdpEngine.debitExchangeRate(token)) as unknown as OptionRate;
    const globalExchangeRate = api.consts.cdpEngine.defaultDebitExchangeRate as unknown as Rate;
    const exchangeRate = debitExchangeRate.isNone ? BigInt(globalExchangeRate.toString()) : BigInt(debitExchangeRate.unwrapOrDefault().toString());

    record.collateralId = tokenName;
    record.blockId = block.id;
    record.debitExchangeRate = exchangeRate;
    await record.save();

    return exchangeRate;
  }
}