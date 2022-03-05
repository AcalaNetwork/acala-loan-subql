import { forceToCurrencyName } from "@acala-network/sdk-core";
import { AccountId, CurrencyId } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { ensureExtrinsic } from ".";
import { getAccount, getBlock, getPosition, getTransferPosition } from "../utils";

export const transferLoan = async (event: SubstrateEvent) => {
  const [from, to, token] = event.event.data as unknown as [AccountId, AccountId, CurrencyId];

  const block = await getBlock(event.block);

  const tokenName = forceToCurrencyName(token);
  const fromAccount = await getAccount(from.toString());
  const toAccount = await getAccount(to.toString());

  const fromId = `${from.toString()}-${tokenName}`;
  const toId = `${to.toString()}-${tokenName}`;

  const fromPosition = await getPosition(fromId);
  const toPosition = await getPosition(toId);

  toPosition.collateralId = tokenName;
  toPosition.debitAmount = toPosition.debitAmount + fromPosition.debitAmount;
  toPosition.depositAmount = toPosition.depositAmount + fromPosition.depositAmount;
  toPosition.ownerId = toAccount.id;
  toPosition.updateAt = block.timestamp;
  toPosition.updateAtBlockId = block.id;

  fromPosition.debitAmount = BigInt(0);
  fromPosition.depositAmount = BigInt(0);

  fromAccount.txCount = fromAccount.txCount + 1;
  toAccount.txCount = toAccount.txCount + 1;
  fromPosition.txCount = fromPosition.txCount + 1;
  toPosition.txCount = toPosition.txCount + 1;

  await fromAccount.save();
  await toAccount.save();
  await fromPosition.save();
  await toPosition.save();
  await createTransferLoanHistory(event, token, from.toString(), to.toString());
}

export const createTransferLoanHistory = async (event: SubstrateEvent, token: CurrencyId, from: string, to: string) => {
  const tokenName = forceToCurrencyName(token);

  const block = await getBlock(event.block);

  const historyId = `${block.hash}-${event.event.index.toString()}`;
  const history = await getTransferPosition(historyId);

  history.collateralId = tokenName;
  history.fromId = from;
  history.toId = to;
  history.blockId = block.id;

  if (event.extrinsic) {
    const extrinshcData = await ensureExtrinsic(event);

    history.extrinsicId = extrinshcData.id;
  }

  await history.save()
}