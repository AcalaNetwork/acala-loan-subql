// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type ConfiscatePositionProps = Omit<ConfiscatePosition, NonNullable<FunctionPropertyNames<ConfiscatePosition>>>;

export class ConfiscatePosition implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public senderId?: string;

    public ownerId?: string;

    public collateralId?: string;

    public collateralAdjustment?: bigint;

    public debitAdjustment?: bigint;

    public collateralAdjustmentUSD?: bigint;

    public debitAdjustmentUSD?: bigint;

    public blockId?: string;

    public timestamp?: Date;

    public extrinsicId?: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save ConfiscatePosition entity without an ID");
        await store.set('ConfiscatePosition', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove ConfiscatePosition entity without an ID");
        await store.remove('ConfiscatePosition', id.toString());
    }

    static async get(id:string): Promise<ConfiscatePosition | undefined>{
        assert((id !== null && id !== undefined), "Cannot get ConfiscatePosition entity without an ID");
        const record = await store.get('ConfiscatePosition', id.toString());
        if (record){
            return ConfiscatePosition.create(record as ConfiscatePositionProps);
        }else{
            return;
        }
    }


    static async getBySenderId(senderId: string): Promise<ConfiscatePosition[] | undefined>{
      
      const records = await store.getByField('ConfiscatePosition', 'senderId', senderId);
      return records.map(record => ConfiscatePosition.create(record as ConfiscatePositionProps));
      
    }

    static async getByOwnerId(ownerId: string): Promise<ConfiscatePosition[] | undefined>{
      
      const records = await store.getByField('ConfiscatePosition', 'ownerId', ownerId);
      return records.map(record => ConfiscatePosition.create(record as ConfiscatePositionProps));
      
    }

    static async getByCollateralId(collateralId: string): Promise<ConfiscatePosition[] | undefined>{
      
      const records = await store.getByField('ConfiscatePosition', 'collateralId', collateralId);
      return records.map(record => ConfiscatePosition.create(record as ConfiscatePositionProps));
      
    }

    static async getByBlockId(blockId: string): Promise<ConfiscatePosition[] | undefined>{
      
      const records = await store.getByField('ConfiscatePosition', 'blockId', blockId);
      return records.map(record => ConfiscatePosition.create(record as ConfiscatePositionProps));
      
    }

    static async getByExtrinsicId(extrinsicId: string): Promise<ConfiscatePosition[] | undefined>{
      
      const records = await store.getByField('ConfiscatePosition', 'extrinsicId', extrinsicId);
      return records.map(record => ConfiscatePosition.create(record as ConfiscatePositionProps));
      
    }


    static create(record: ConfiscatePositionProps): ConfiscatePosition {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new ConfiscatePosition(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
