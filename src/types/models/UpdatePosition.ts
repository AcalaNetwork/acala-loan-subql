// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class UpdatePosition implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public ownerId?: string;

    public collateralId?: string;

    public collateralAjustment?: bigint;

    public debitAjustment?: bigint;

    public collateralAjustmentUSD?: bigint;

    public debitAjustmentUSD?: bigint;

    public blockId?: string;

    public extrinsicId?: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save UpdatePosition entity without an ID");
        await store.set('UpdatePosition', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove UpdatePosition entity without an ID");
        await store.remove('UpdatePosition', id.toString());
    }

    static async get(id:string): Promise<UpdatePosition | undefined>{
        assert((id !== null && id !== undefined), "Cannot get UpdatePosition entity without an ID");
        const record = await store.get('UpdatePosition', id.toString());
        if (record){
            return UpdatePosition.create(record);
        }else{
            return;
        }
    }


    static async getByOwnerId(ownerId: string): Promise<UpdatePosition[] | undefined>{
      
      const records = await store.getByField('UpdatePosition', 'ownerId', ownerId);
      return records.map(record => UpdatePosition.create(record));
      
    }

    static async getByCollateralId(collateralId: string): Promise<UpdatePosition[] | undefined>{
      
      const records = await store.getByField('UpdatePosition', 'collateralId', collateralId);
      return records.map(record => UpdatePosition.create(record));
      
    }

    static async getByBlockId(blockId: string): Promise<UpdatePosition[] | undefined>{
      
      const records = await store.getByField('UpdatePosition', 'blockId', blockId);
      return records.map(record => UpdatePosition.create(record));
      
    }

    static async getByExtrinsicId(extrinsicId: string): Promise<UpdatePosition[] | undefined>{
      
      const records = await store.getByField('UpdatePosition', 'extrinsicId', extrinsicId);
      return records.map(record => UpdatePosition.create(record));
      
    }


    static create(record: Partial<Omit<UpdatePosition, FunctionPropertyNames<UpdatePosition>>> & Entity): UpdatePosition {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new UpdatePosition(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
