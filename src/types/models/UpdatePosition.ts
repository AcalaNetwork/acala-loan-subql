// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type UpdatePositionProps = Omit<UpdatePosition, NonNullable<FunctionPropertyNames<UpdatePosition>>>;

export class UpdatePosition implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public ownerId: string;

    public collateralId: string;

    public collateralAdjustment: bigint;

    public debitAdjustment: bigint;

    public collateralAdjustmentUSD: bigint;

    public debitAdjustmentUSD: bigint;

    public price: bigint;

    public debitExchangeRate: bigint;

    public blockId: string;

    public extrinsicId?: string;

    public timestamp: Date;


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
            return UpdatePosition.create(record as UpdatePositionProps);
        }else{
            return;
        }
    }


    static async getByOwnerId(ownerId: string): Promise<UpdatePosition[] | undefined>{
      
      const records = await store.getByField('UpdatePosition', 'ownerId', ownerId);
      return records.map(record => UpdatePosition.create(record as UpdatePositionProps));
      
    }

    static async getByCollateralId(collateralId: string): Promise<UpdatePosition[] | undefined>{
      
      const records = await store.getByField('UpdatePosition', 'collateralId', collateralId);
      return records.map(record => UpdatePosition.create(record as UpdatePositionProps));
      
    }

    static async getByBlockId(blockId: string): Promise<UpdatePosition[] | undefined>{
      
      const records = await store.getByField('UpdatePosition', 'blockId', blockId);
      return records.map(record => UpdatePosition.create(record as UpdatePositionProps));
      
    }

    static async getByExtrinsicId(extrinsicId: string): Promise<UpdatePosition[] | undefined>{
      
      const records = await store.getByField('UpdatePosition', 'extrinsicId', extrinsicId);
      return records.map(record => UpdatePosition.create(record as UpdatePositionProps));
      
    }


    static create(record: UpdatePositionProps): UpdatePosition {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new UpdatePosition(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
