import { forceToCurrencyIdName } from "@acala-network/sdk-core";
import { AccountId, Balance, CurrencyId } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { ensureBlock, ensureExtrinsic } from ".";
import { getAccount, getCollateral, getLiquidUnsafe } from "../utils";

export const liquidateUnsafeCDP = async (event: SubstrateEvent) => {
  const [collateral, account, collateral_amount, bad_debt_value, liquidation_strategy] = event.event.data as unknown as [CurrencyId, AccountId, Balance, Balance, Balance];

  const owner = await getAccount(account.toString());
  const token = await getCollateral(forceToCurrencyIdName(collateral));
  const extrinshcData = await ensureExtrinsic(event);
  const blockData = await ensureBlock(event);

  const id = `${extrinshcData.hash}-${event.event.index.toString()}`;

  const history = await getLiquidUnsafe(id);
  history.ownerId = owner.id;
  history.collateralId = token.name;
  history.collateralVolume = BigInt(collateral_amount.toString());
  history.badDebitVolumeUSD = BigInt(bad_debt_value.toString());
  history.liquidationStrategy = liquidation_strategy.toString();
  history.blockId = blockData.id;
  history.extrinsicId = extrinshcData.id;

  await history.save();
}