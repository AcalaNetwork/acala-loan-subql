// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class LiquidUnsafe implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public ownerId?: string;

    public collateralId?: string;

    public collateralVolume?: bigint;

    public badDebitVolumeUSD?: bigint;

    public liquidationStrategy?: string;

    public blockId?: string;

    public extrinsicId?: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save LiquidUnsafe entity without an ID");
        await store.set('LiquidUnsafe', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove LiquidUnsafe entity without an ID");
        await store.remove('LiquidUnsafe', id.toString());
    }

    static async get(id:string): Promise<LiquidUnsafe | undefined>{
        assert((id !== null && id !== undefined), "Cannot get LiquidUnsafe entity without an ID");
        const record = await store.get('LiquidUnsafe', id.toString());
        if (record){
            return LiquidUnsafe.create(record);
        }else{
            return;
        }
    }


    static async getByOwnerId(ownerId: string): Promise<LiquidUnsafe[] | undefined>{
      
      const records = await store.getByField('LiquidUnsafe', 'ownerId', ownerId);
      return records.map(record => LiquidUnsafe.create(record));
      
    }

    static async getByCollateralId(collateralId: string): Promise<LiquidUnsafe[] | undefined>{
      
      const records = await store.getByField('LiquidUnsafe', 'collateralId', collateralId);
      return records.map(record => LiquidUnsafe.create(record));
      
    }

    static async getByBlockId(blockId: string): Promise<LiquidUnsafe[] | undefined>{
      
      const records = await store.getByField('LiquidUnsafe', 'blockId', blockId);
      return records.map(record => LiquidUnsafe.create(record));
      
    }

    static async getByExtrinsicId(extrinsicId: string): Promise<LiquidUnsafe[] | undefined>{
      
      const records = await store.getByField('LiquidUnsafe', 'extrinsicId', extrinsicId);
      return records.map(record => LiquidUnsafe.create(record));
      
    }


    static create(record: Partial<Omit<LiquidUnsafe, FunctionPropertyNames<LiquidUnsafe>>> & Entity): LiquidUnsafe {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new LiquidUnsafe(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
