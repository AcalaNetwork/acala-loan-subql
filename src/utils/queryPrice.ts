import { FixedPointNumber as FN, forceToCurrencyName } from "@acala-network/sdk-core";
import { Option } from "@polkadot/types";
import { TimestampedValue } from '@open-web3/orml-types/interfaces';
import { getPriceBoundle } from "./record";
import { SubstrateEvent } from "@subql/types";
import { ensureBlock } from "../handlers";
import { CurrencyId } from "@acala-network/types/interfaces";
import { getTokenDecimals } from ".";

const getDecimals = async (token: string) => {
  const decimals = await getTokenDecimals(api as any, token);
  return decimals;
}

const queryTotalStaking = async () => {
  if (api.query.homa) {
    const stakingLedgers = await api.query.homa.stakingLedgers.entries();
    const totalInSubAccount = stakingLedgers.reduce((acc, cur) => {
      const item = (cur[1].toJSON() as any).bonded.toString();
      return acc.add(FN.fromInner(item, 12));
    }, new FN(0, 12));
    const bonds = await api.query.homa.toBondPool()
    return totalInSubAccount.add(FN.fromInner(bonds.toString(), 12));
  } else {
    try {
      const total = await api.query.homaLite?.totalStakingCurrency;
      return FN.fromInner(total.toString(), 12);
    } catch (error) {
      const total = await api.query.homa?.totalStakingCurrency;
      return FN.fromInner(total.toString(), 12);
    }
  }
}

export const circulatePrice = async (currency: string): Promise<FN> => {
  const liquidCurrencyId = (api.consts.homa?.liquidCurrencyId || api.consts.homaLite?.liquidCurrencyId) as unknown as CurrencyId;
  const stakingCurrencyId = (api.consts.homa?.stakingCurrencyId || api.consts.homaLite?.stakingCurrencyId) as unknown as CurrencyId;

  if (liquidCurrencyId && forceToCurrencyName(liquidCurrencyId) === forceToCurrencyName(currency)) {
    const [_stakingTokenPrice, _liquidIssuance] = await Promise.all([
      api.query.acalaOracle.values({ Token: forceToCurrencyName(stakingCurrencyId) }),
      api.query.tokens.totalIssuance({ Token: currency })
    ])
    const stakingTokenPrice = (_stakingTokenPrice as unknown as Option<TimestampedValue>).unwrapOrDefault().value.toString();
    const stakingBalance = await queryTotalStaking();
    const decimals = await getTokenDecimals(api as any, currency);
    const liquidIssuance = FN.fromInner(_liquidIssuance.toString(), decimals);
    const ratio = liquidIssuance.isZero() ? FN.ZERO : stakingBalance.div(liquidIssuance);
    return FN.fromInner(stakingTokenPrice, 18).times(ratio);
  } else {
    const oraclePrice = await api.query.acalaOracle.values({ Token: forceToCurrencyName(currency) });
    const value = (oraclePrice as unknown as Option<TimestampedValue>).unwrapOrDefault().value.toString();
    return FN.fromInner(value, 18);
  };
}

export const queryPrice = async (event: SubstrateEvent, token: string) => {
  const {id: blockId, number} = await ensureBlock(event);
  const id = `${number}-${token}`;
  const {isExist, record} = await getPriceBoundle(id);
  if(isExist) return new FN(record.price.toString());
  else {
    record.blockId = blockId;
    record.collateralId = token;
    record.price = BigInt((await circulatePrice(token)).toNumber());

    await record.save();
    return new FN(record.price.toString());
  }
}
