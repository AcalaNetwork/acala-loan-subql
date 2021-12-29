import { FixedPointNumber as FN, forceToCurrencyIdName } from "@acala-network/sdk-core";
import { Option } from "@polkadot/types";
import { TimestampedValue } from '@open-web3/orml-types/interfaces';

export const queryPrice = async (currency: string): Promise<FN> => {
  const liquidCurrencyId = 'LKSM';
  const stakingCurrencyId = 'KSM';

  if (liquidCurrencyId && forceToCurrencyIdName(liquidCurrencyId) === forceToCurrencyIdName(currency)) {
    const [_stakingTokenPrice, _stakingBalance, _liquidIssuance] = await Promise.all([
      api.query.acalaOracle.values({ Token: forceToCurrencyIdName(stakingCurrencyId) }),
      api.query.homaLite.totalStakingCurrency(),
      api.query.tokens.totalIssuance({ Token: currency })
    ])
    const stakingTokenPrice = (_stakingTokenPrice as Option<TimestampedValue>).unwrapOrDefault().value.toString();
    const stakingBalance = FN.fromInner(_stakingBalance.toString(), 12);
    const liquidIssuance = FN.fromInner(_liquidIssuance.toString(), 12);
    const ratio = liquidIssuance.isZero() ? FN.ZERO : stakingBalance.div(liquidIssuance);
    return FN.fromInner(stakingTokenPrice, 18).times(ratio);
  } else {
    const oraclePrice = await api.query.acalaOracle.values({ Token: forceToCurrencyIdName(currency) });
    const value = (oraclePrice as Option<TimestampedValue>).unwrapOrDefault().value.toString();
    return FN.fromInner(value, 18);
  };
}

