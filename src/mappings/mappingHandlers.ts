import { SubstrateEvent } from "@subql/types";
import { transferLoan, liquidateUnsafeCDP, updateParams, closeByDex } from "../handlers";
import { handleLoanPositionUpdate, handleConfiscate } from '../handlers/updateLoanPosition';

export async function handleParamsUpdated(event: SubstrateEvent): Promise<void> {
	await updateParams(event);
}

export async function handleLiquidateUnsafeCDP(event: SubstrateEvent): Promise<void> {
	await liquidateUnsafeCDP(event);
}

export async function handleCloseCDPInDebitByDEX(event: SubstrateEvent): Promise<void> {
	await closeByDex(event);
}

export async function handlePositionUpdated(event: SubstrateEvent): Promise<void> {
	await handleLoanPositionUpdate(event);
}

export async function handleConfiscateCollateralAndDebit(event: SubstrateEvent): Promise<void> {
	await handleConfiscate(event);
}

export async function handleTransferLoan(event: SubstrateEvent): Promise<void> {
	await transferLoan(event);
}