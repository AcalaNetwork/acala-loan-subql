import { forceToCurrencyName } from "@acala-network/sdk-core";
import { AccountId, CurrencyId } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { getAccount, getBlock, getExtrinsic, getPosition, getTransferPosition } from "../utils";
import { updateLoanPosition } from './updateLoanPosition';

export const createTransferLoanHistory = async (
  event: SubstrateEvent,
  token: CurrencyId,
  from: string,
  to: string
) => {
  const tokenName = forceToCurrencyName(token);
  const block = await getBlock(event.block);
  const history = await getTransferPosition(`${block.id}-${event.event.index.toString()}`);

  history.collateralId = tokenName;
  history.fromId = from;
  history.toId = to;
  history.blockId = block.id;

  if (event.extrinsic) {
    const extrinshcData = await getExtrinsic(event.extrinsic);

    history.extrinsicId = extrinshcData.id;
  }

  await history.save()
}

export const transferLoan = async (event: SubstrateEvent) => {
  const [from, to, token] = event.event.data as unknown as [AccountId, AccountId, CurrencyId];
  const tokenName = forceToCurrencyName(token);
  const fromAccount = await getAccount(from.toString());
  const toAccount = await getAccount(to.toString());
  const fromPosition = await getPosition(tokenName, fromAccount.id);

  await updateLoanPosition(
    event.block,
    fromAccount.address,
    tokenName,
    -fromPosition.depositAmount,
    -fromPosition.debitAmount
  );
  await updateLoanPosition(
    event.block,
    toAccount.address,
    tokenName,
    fromPosition.depositAmount,
    fromPosition.debitAmount
  );
  await createTransferLoanHistory(event, token, from.toString(), to.toString());
}
