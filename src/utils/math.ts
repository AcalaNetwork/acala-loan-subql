import { FixedPointNumber } from "@acala-network/sdk-core";

const PRICE_DECIMALS = 18

export function getVolumeUSD (amount: BigInt, decimals: number, price: BigInt) {
  return FixedPointNumber.fromInner(amount.toString(), decimals).mul(FixedPointNumber.fromInner(price.toString(), PRICE_DECIMALS))
}