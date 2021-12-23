// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class CollateralParams implements Entity {

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


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save CollateralParams entity without an ID");
        await store.set('CollateralParams', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove CollateralParams entity without an ID");
        await store.remove('CollateralParams', id.toString());
    }

    static async get(id:string): Promise<CollateralParams | undefined>{
        assert((id !== null && id !== undefined), "Cannot get CollateralParams entity without an ID");
        const record = await store.get('CollateralParams', id.toString());
        if (record){
            return CollateralParams.create(record);
        }else{
            return;
        }
    }


    static async getByCollateralId(collateralId: string): Promise<CollateralParams[] | undefined>{
      
      const records = await store.getByField('CollateralParams', 'collateralId', collateralId);
      return records.map(record => CollateralParams.create(record));
      
    }


    static create(record: Partial<Omit<CollateralParams, FunctionPropertyNames<CollateralParams>>> & Entity): CollateralParams {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new CollateralParams(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
