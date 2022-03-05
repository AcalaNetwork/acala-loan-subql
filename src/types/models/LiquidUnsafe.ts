// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type LiquidUnsafeProps = Omit<LiquidUnsafe, NonNullable<FunctionPropertyNames<LiquidUnsafe>>>;

export class LiquidUnsafe implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public senderId: string;

    public ownerId: string;

    public collateralId: string;

    public collateralAmount: bigint;

    public collateralVolumeUSD: bigint;

    public badDebitVolumeUSD: bigint;

    public liquidationStrategy: string;

    public price: bigint;

    public blockId: string;

    public extrinsicId?: string;

    public timestamp: Date;


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
            return LiquidUnsafe.create(record as LiquidUnsafeProps);
        }else{
            return;
        }
    }


    static async getBySenderId(senderId: string): Promise<LiquidUnsafe[] | undefined>{
      
      const records = await store.getByField('LiquidUnsafe', 'senderId', senderId);
      return records.map(record => LiquidUnsafe.create(record as LiquidUnsafeProps));
      
    }

    static async getByOwnerId(ownerId: string): Promise<LiquidUnsafe[] | undefined>{
      
      const records = await store.getByField('LiquidUnsafe', 'ownerId', ownerId);
      return records.map(record => LiquidUnsafe.create(record as LiquidUnsafeProps));
      
    }

    static async getByCollateralId(collateralId: string): Promise<LiquidUnsafe[] | undefined>{
      
      const records = await store.getByField('LiquidUnsafe', 'collateralId', collateralId);
      return records.map(record => LiquidUnsafe.create(record as LiquidUnsafeProps));
      
    }

    static async getByBlockId(blockId: string): Promise<LiquidUnsafe[] | undefined>{
      
      const records = await store.getByField('LiquidUnsafe', 'blockId', blockId);
      return records.map(record => LiquidUnsafe.create(record as LiquidUnsafeProps));
      
    }

    static async getByExtrinsicId(extrinsicId: string): Promise<LiquidUnsafe[] | undefined>{
      
      const records = await store.getByField('LiquidUnsafe', 'extrinsicId', extrinsicId);
      return records.map(record => LiquidUnsafe.create(record as LiquidUnsafeProps));
      
    }


    static create(record: LiquidUnsafeProps): LiquidUnsafe {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new LiquidUnsafe(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
