import { forceToCurrencyName } from "@acala-network/sdk-core";
import { AccountId, CurrencyId } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { ensureBlock, ensureExtrinsic } from ".";
import { getAccount, getCollateral, getPosition, getTransferPosition } from "../utils";

export const transferLoan = async (event: SubstrateEvent) => {
  const [from, to, token] = event.event.data as unknown as [AccountId, AccountId, CurrencyId];

  const blockData = await ensureBlock(event);

  const tokenName = forceToCurrencyName(token);
  const tokenData = await getCollateral(tokenName);
  const fromData = await getAccount(from.toString());
  const toData = await getAccount(to.toString());

  const fromId = `${from.toString()}-${tokenName}`;
  const toId = `${to.toString()}-${tokenName}`;

  const fromPosition = await getPosition(fromId);
  const toPosition = await getPosition(toId);

  toPosition.collateralId = tokenName;
  toPosition.debitVolume = toPosition.debitVolume + fromPosition.debitVolume;
  toPosition.depositVolume = toPosition.depositVolume + fromPosition.depositVolume;
  toPosition.ownerId = toData.id;
  toPosition.updateAtId = blockData.id;

  fromPosition.debitVolume = BigInt(0);
  fromPosition.depositVolume = BigInt(0);

  fromData.txCount = fromData.txCount + BigInt(1);
  toData.txCount = toData.txCount + BigInt(1);

  await fromData.save();
  await toData.save();
  await fromPosition.save();
  await toPosition.save();
  await createTransferLoanHistory(event, token, from.toString(), to.toString());
}

export const createTransferLoanHistory = async (event: SubstrateEvent, token: CurrencyId, from: string, to: string) => {
  const tokenName = forceToCurrencyName(token);
  const extrinshcData = await ensureExtrinsic(event);
  const blockData = await ensureBlock(event);

  const historyId = `${blockData.hash}-${event.event.index.toString()}`;
  const history = await getTransferPosition(historyId);

  history.collateralId = tokenName;
  history.fromId = from;
  history.toId = to;
  history.blockId = blockData.id;
  history.extrinsicId = extrinshcData.id;
  await history.save()
}