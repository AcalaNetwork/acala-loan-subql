import { FixedPointNumber, forceToCurrencyName } from "@acala-network/sdk-core";
import { getStableCoinCurrency, getTokenDecimals } from "@acala-network/subql-utils";
import { AccountId, Balance, CurrencyId } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { getAccount, getBlock, getCollateral, getExchangeBundle, getExtrinsic, getLiquidUnsafe, getPriceBundle } from "../utils";
import { getVolumeUSD } from '../utils/math';

export const liquidateUnsafeCDP = async (event: SubstrateEvent) => {
  const [_collateral, account, collateral_amount, bad_debt_value, liquidation_strategy] = event.event.data as unknown as [CurrencyId, AccountId, Balance, Balance, Balance];

  const block = await getBlock(event.block);
  const owner = await getAccount(account.toString());
  const collateral = await getCollateral(forceToCurrencyName(_collateral));
  const priceBundle = await getPriceBundle(collateral.name, event.block);
  const exchangeRateBundle = await getExchangeBundle(collateral.name, event.block);
  const history = await getLiquidUnsafe(`${block.id}-${event.idx.toString()}`);
  const stableCoinDecimals = await getTokenDecimals(api as any, getStableCoinCurrency(api as any));

  history.ownerId = owner.id;
  history.collateralId = collateral.id;
  history.collateralAmount = BigInt(collateral_amount.toString());
  history.collateralVolumeUSD = getVolumeUSD(history.collateralAmount, collateral.decimals, priceBundle.price)
  history.badDebitVolumeUSD = getVolumeUSD(BigInt(bad_debt_value.toString()), stableCoinDecimals, BigInt(10 ** 18));
  history.liquidationStrategy = liquidation_strategy.toString();
  history.price = priceBundle.price;
  history.debitExchangeRate = exchangeRateBundle.debitExchangeRate;
  history.blockId = block.id;
  history.timestamp = block.timestamp;

  owner.txCount = owner.txCount + 1;

  if (event.extrinsic) {
    const extrinsic = await getExtrinsic(event.extrinsic);

    history.senderId = extrinsic.senderId;
    history.extrinsicId = extrinsic.id;
  }

  await owner.save();
  await history.save();
}