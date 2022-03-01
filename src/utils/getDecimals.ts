import { forceToCurrencyName, getForeignAssetIdFromName, isDexShareName, isForeignAssetName, isLiquidCrowdloanName, unzipDexShareName } from "@acala-network/sdk-core";
import { getTokenName } from "@acala-network/subql-utils";
import { ApiPromise, ApiRx } from "@polkadot/api";

let tokensDecimals: {[key: string]: number} = {};

export async function getTokenDecimals(api: ApiPromise | ApiRx, token: any) {
  if (Object.keys(tokensDecimals).length === 0) {
    const decimals = api.registry.chainDecimals;
    api.registry.chainTokens.forEach((token, index) => {
      tokensDecimals[token] = decimals[index];
    });
  }

  const name = getTokenName(token)
  if(tokensDecimals[name]) return tokensDecimals[name];

  const stakingToken = api.consts?.homaLite?.stakingCurrencyId || api.consts?.homa?.stakingCurrencyId;
  let stakingTokenName = '';
  try {
    stakingTokenName = forceToCurrencyName(stakingToken);
  } catch (error) {
    return 12;
  }

  if (isDexShareName(name)) {
    const [token0] = unzipDexShareName(name);
    const result = await getTokenDecimals(api, token0);

    return result;
  }

  if (isLiquidCrowdloanName(name)) {
    return tokensDecimals[stakingTokenName]
  }

  if (isForeignAssetName(name) && api.query.assetRegistry && !tokensDecimals[name]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const metadata = await api.query.assetRegistry.assetMetadatas({ ForeignAssetId: getForeignAssetIdFromName(name) }) as any

    tokensDecimals[name] = metadata?.decimals?.toNumber();
  }

  return tokensDecimals[name];
}