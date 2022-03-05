import { FixedPointNumber } from "@acala-network/sdk-core";

const PRICE_DECIMALS = 18

export function getVolumeUSD (amount: bigint, decimals: number, price: bigint) {
  return BigInt(FixedPointNumber.fromInner(amount.toString(), decimals).mul(FixedPointNumber.fromInner(price.toString(), PRICE_DECIMALS)).toChainData())
}

export function noNegative (a: bigint): bigint {
  return a >= BigInt(0) ? a : BigInt(0);
}