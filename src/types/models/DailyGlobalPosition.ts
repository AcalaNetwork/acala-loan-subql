// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class DailyGlobalPosition implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public collateralId?: string;

    public debitAmount?: bigint;

    public collateralAmount?: bigint;

    public debitExchangeRate?: bigint;

    public timestamp?: Date;

    public txCount?: bigint;

    public debitVolume?: bigint;

    public collateralVolume?: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save DailyGlobalPosition entity without an ID");
        await store.set('DailyGlobalPosition', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove DailyGlobalPosition entity without an ID");
        await store.remove('DailyGlobalPosition', id.toString());
    }

    static async get(id:string): Promise<DailyGlobalPosition | undefined>{
        assert((id !== null && id !== undefined), "Cannot get DailyGlobalPosition entity without an ID");
        const record = await store.get('DailyGlobalPosition', id.toString());
        if (record){
            return DailyGlobalPosition.create(record);
        }else{
            return;
        }
    }


    static async getByCollateralId(collateralId: string): Promise<DailyGlobalPosition[] | undefined>{
      
      const records = await store.getByField('DailyGlobalPosition', 'collateralId', collateralId);
      return records.map(record => DailyGlobalPosition.create(record));
      
    }


    static create(record: Partial<Omit<DailyGlobalPosition, FunctionPropertyNames<DailyGlobalPosition>>> & Entity): DailyGlobalPosition {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new DailyGlobalPosition(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
