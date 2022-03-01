import { FixedPointNumber, forceToCurrencyName } from "@acala-network/sdk-core";
import { AccountId, Balance, CurrencyId } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { ensureBlock, ensureExtrinsic } from ".";
import { getAccount, getCloseByDex, getCollateral, queryPrice } from "../utils";

export const closeByDex = async (event: SubstrateEvent) => {
  const [collateral, account, sold_collateral_amount, refund_collateral_amount, debit_value] = event.event.data as unknown as [CurrencyId, AccountId, Balance, Balance, Balance, Balance];

  const owner = await getAccount(account.toString());
	const token = await getCollateral(forceToCurrencyName(collateral));
  const extrinshcData = await ensureExtrinsic(event);
  const blockData = await ensureBlock(event);

  const id = `${blockData.hash}-${event.event.index.toString()}`;
  const price = await queryPrice(event, token.name);

  const history = await getCloseByDex(id);
  history.ownerId = owner.id;
  history.collateralId = token.name;
  history.soldVolume = BigInt(sold_collateral_amount.toString());
  history.refundVolume = BigInt(refund_collateral_amount.toString());
  history.debitVolumeUSD = BigInt(debit_value.toString());
  history.soldVolumeUSD = BigInt(price.times(FixedPointNumber.fromInner(sold_collateral_amount.toString(), token.decimals)).toString());
  history.refundVolumeUSD = BigInt(price.times(FixedPointNumber.fromInner(refund_collateral_amount.toString(), token.decimals)).toString());
  history.extrinsicId = extrinshcData.id;
  history.blockId = blockData.id;

  owner.txCount = owner.txCount + BigInt(1);

  await owner.save();
  await history.save();
}