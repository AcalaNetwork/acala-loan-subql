// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class CloseByDex implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public ownerId?: string;

    public collateralId?: string;

    public soldVolume?: bigint;

    public refundVolume?: bigint;

    public debitVolumeUSD?: bigint;

    public soldVolumeUSD?: bigint;

    public refundVolumeUSD?: bigint;

    public blockId?: string;

    public extrinsicId?: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save CloseByDex entity without an ID");
        await store.set('CloseByDex', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove CloseByDex entity without an ID");
        await store.remove('CloseByDex', id.toString());
    }

    static async get(id:string): Promise<CloseByDex | undefined>{
        assert((id !== null && id !== undefined), "Cannot get CloseByDex entity without an ID");
        const record = await store.get('CloseByDex', id.toString());
        if (record){
            return CloseByDex.create(record);
        }else{
            return;
        }
    }


    static async getByOwnerId(ownerId: string): Promise<CloseByDex[] | undefined>{
      
      const records = await store.getByField('CloseByDex', 'ownerId', ownerId);
      return records.map(record => CloseByDex.create(record));
      
    }

    static async getByCollateralId(collateralId: string): Promise<CloseByDex[] | undefined>{
      
      const records = await store.getByField('CloseByDex', 'collateralId', collateralId);
      return records.map(record => CloseByDex.create(record));
      
    }

    static async getByBlockId(blockId: string): Promise<CloseByDex[] | undefined>{
      
      const records = await store.getByField('CloseByDex', 'blockId', blockId);
      return records.map(record => CloseByDex.create(record));
      
    }

    static async getByExtrinsicId(extrinsicId: string): Promise<CloseByDex[] | undefined>{
      
      const records = await store.getByField('CloseByDex', 'extrinsicId', extrinsicId);
      return records.map(record => CloseByDex.create(record));
      
    }


    static create(record: Partial<Omit<CloseByDex, FunctionPropertyNames<CloseByDex>>> & Entity): CloseByDex {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new CloseByDex(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
