import { FixedPointNumber as FN, forceToCurrencyIdName } from "@acala-network/sdk-core";
import { Option } from "@polkadot/types";
import { TimestampedValue } from '@open-web3/orml-types/interfaces';

const queryTotalStaking = async () => {
  if (api.query.homa) {
    const stakingLedgers = await api.query.homa.stakingLedgers.entries();
    const totalInSubAccount = stakingLedgers.reduce((acc, cur) => {
      const item = (cur[1].toJSON() as any).bonded.toString();
      return acc.add(FN.fromInner(item, 12));
    }, new FN(0, 12));
    logger.info(totalInSubAccount.toString())
    const bonds = await api.query.homa.toBondPool()
    return totalInSubAccount.add(FN.fromInner(bonds.toString(), 12));
  } else {
    const total = await api.query.homaLite.totalStakingCurrency();
    return FN.fromInner(total.toString(), 12);
  }
}

export const queryPrice = async (currency: string): Promise<FN> => {
  const liquidCurrencyId = 'LKSM';
  const stakingCurrencyId = 'KSM';

  if (liquidCurrencyId && forceToCurrencyIdName(liquidCurrencyId) === forceToCurrencyIdName(currency)) {
    const [_stakingTokenPrice, _liquidIssuance] = await Promise.all([
      api.query.acalaOracle.values({ Token: forceToCurrencyIdName(stakingCurrencyId) }),
      api.query.tokens.totalIssuance({ Token: currency })
    ])
    const stakingTokenPrice = (_stakingTokenPrice as Option<TimestampedValue>).unwrapOrDefault().value.toString();
    const stakingBalance = await queryTotalStaking();
    const liquidIssuance = FN.fromInner(_liquidIssuance.toString(), 12);
    const ratio = liquidIssuance.isZero() ? FN.ZERO : stakingBalance.div(liquidIssuance);
    return FN.fromInner(stakingTokenPrice, 18).times(ratio);
  } else {
    const oraclePrice = await api.query.acalaOracle.values({ Token: forceToCurrencyIdName(currency) });
    const value = (oraclePrice as Option<TimestampedValue>).unwrapOrDefault().value.toString();
    return FN.fromInner(value, 18);
  };
}

