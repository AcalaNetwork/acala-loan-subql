import { forceToCurrencyName } from "@acala-network/sdk-core";
import { AccountId, Balance, CurrencyId } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { getAccount, getBlock, getCloseByDex, getCollateral, getExtrinsic, getPriceBundle } from "../utils";
import { getVolumeUSD } from '../utils/math';

export const closeByDex = async (event: SubstrateEvent) => {
  const [collateral, account, sold_collateral_amount, refund_collateral_amount, debit_value] = event.event.data as unknown as [CurrencyId, AccountId, Balance, Balance, Balance, Balance];

  const owner = await getAccount(account.toString());
	const token = await getCollateral(forceToCurrencyName(collateral));
  const block = await getBlock(event.block);
  const priceBundle = await getPriceBundle(token.name, event.block);
  const history = await getCloseByDex(`${block.id}-${event.event.index.toString()}`);

  history.ownerId = owner.id;
  history.collateralId = token.name;
  history.soldAmount = BigInt(sold_collateral_amount.toString());
  history.refundAmount = BigInt(refund_collateral_amount.toString());
  history.debitVolumeUSD = BigInt(debit_value.toString());
  history.soldVolumeUSD = getVolumeUSD(history.soldAmount, token.decimals, priceBundle.price);
  history.refundVolumeUSD = getVolumeUSD(history.refundAmount, token.decimals, priceBundle.price);
  history.price = priceBundle.price;
  history.blockId = block.id;

  if (event.extrinsic) {
    const extrinsic = await getExtrinsic(event.extrinsic);

    history.extrinsicId = extrinsic.id;
  }

  owner.txCount = owner.txCount + 1;

  await history.save();
}