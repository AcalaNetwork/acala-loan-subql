// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type CollateralParamsHistoryProps = Omit<CollateralParamsHistory, NonNullable<FunctionPropertyNames<CollateralParamsHistory>>>;

export class CollateralParamsHistory implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public collateralId: string;

    public maximumTotalDebitValue: bigint;

    public interestRatePerSec: bigint;

    public liquidationRatio: bigint;

    public liquidationPenalty: bigint;

    public requiredCollateralRatio: bigint;

    public startAtBlockId: string;

    public endAtBlockId: string;

    public startAt: Date;

    public endAt: Date;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save CollateralParamsHistory entity without an ID");
        await store.set('CollateralParamsHistory', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove CollateralParamsHistory entity without an ID");
        await store.remove('CollateralParamsHistory', id.toString());
    }

    static async get(id:string): Promise<CollateralParamsHistory | undefined>{
        assert((id !== null && id !== undefined), "Cannot get CollateralParamsHistory entity without an ID");
        const record = await store.get('CollateralParamsHistory', id.toString());
        if (record){
            return CollateralParamsHistory.create(record as CollateralParamsHistoryProps);
        }else{
            return;
        }
    }


    static async getByCollateralId(collateralId: string): Promise<CollateralParamsHistory[] | undefined>{
      
      const records = await store.getByField('CollateralParamsHistory', 'collateralId', collateralId);
      return records.map(record => CollateralParamsHistory.create(record as CollateralParamsHistoryProps));
      
    }

    static async getByStartAtBlockId(startAtBlockId: string): Promise<CollateralParamsHistory[] | undefined>{
      
      const records = await store.getByField('CollateralParamsHistory', 'startAtBlockId', startAtBlockId);
      return records.map(record => CollateralParamsHistory.create(record as CollateralParamsHistoryProps));
      
    }

    static async getByEndAtBlockId(endAtBlockId: string): Promise<CollateralParamsHistory[] | undefined>{
      
      const records = await store.getByField('CollateralParamsHistory', 'endAtBlockId', endAtBlockId);
      return records.map(record => CollateralParamsHistory.create(record as CollateralParamsHistoryProps));
      
    }


    static create(record: CollateralParamsHistoryProps): CollateralParamsHistory {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new CollateralParamsHistory(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
