export const getDebitPool = async () => {
  let debitPool;

  try {
    const _pool = await api.query.cdpTreasury.debitPool();
    debitPool = BigInt(_pool.toString())
  } catch (error) {
    debitPool = BigInt(0)
  }

  return BigInt(debitPool.toString());
}