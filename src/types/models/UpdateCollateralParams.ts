// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class UpdateCollateralParams implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public collateralId?: string;

    public maximumTotalDebitValue?: bigint;

    public interestRatePerSec?: bigint;

    public liquidationRatio?: bigint;

    public liquidationPenalty?: bigint;

    public requiredCollateralRatio?: bigint;

    public blockId?: string;

    public extrinsicId?: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save UpdateCollateralParams entity without an ID");
        await store.set('UpdateCollateralParams', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove UpdateCollateralParams entity without an ID");
        await store.remove('UpdateCollateralParams', id.toString());
    }

    static async get(id:string): Promise<UpdateCollateralParams | undefined>{
        assert((id !== null && id !== undefined), "Cannot get UpdateCollateralParams entity without an ID");
        const record = await store.get('UpdateCollateralParams', id.toString());
        if (record){
            return UpdateCollateralParams.create(record);
        }else{
            return;
        }
    }


    static async getByCollateralId(collateralId: string): Promise<UpdateCollateralParams[] | undefined>{
      
      const records = await store.getByField('UpdateCollateralParams', 'collateralId', collateralId);
      return records.map(record => UpdateCollateralParams.create(record));
      
    }

    static async getByBlockId(blockId: string): Promise<UpdateCollateralParams[] | undefined>{
      
      const records = await store.getByField('UpdateCollateralParams', 'blockId', blockId);
      return records.map(record => UpdateCollateralParams.create(record));
      
    }

    static async getByExtrinsicId(extrinsicId: string): Promise<UpdateCollateralParams[] | undefined>{
      
      const records = await store.getByField('UpdateCollateralParams', 'extrinsicId', extrinsicId);
      return records.map(record => UpdateCollateralParams.create(record));
      
    }


    static create(record: Partial<Omit<UpdateCollateralParams, FunctionPropertyNames<UpdateCollateralParams>>> & Entity): UpdateCollateralParams {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new UpdateCollateralParams(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
