import { SubstrateEvent } from "@subql/types";
import { getBlock, getExtrinsic } from "../utils/record";

export const getBlock = async (event: SubstrateEvent) => {
  const blockId = event.block.block.hash.toString();
  const blockData = await getBlock(blockId);
  blockData.hash = blockId;
  blockData.number = BigInt(event.block.block.header.number.toNumber());
  blockData.timestamp = event.block.timestamp;
  await blockData.save();
  return blockData;
}

export const ensureExtrinsic = async (event: SubstrateEvent) => {
  const blockData = await getBlock(event);
  const extrinsicId = event.extrinsic?.extrinsic?.hash?.toString() ?? blockData.id;

  const extrinsicData = await getExtrinsic(extrinsicId);
  extrinsicData.blockId = blockData.id;
  extrinsicData.hash = extrinsicId;
  await extrinsicData.save();
  return extrinsicData;
}