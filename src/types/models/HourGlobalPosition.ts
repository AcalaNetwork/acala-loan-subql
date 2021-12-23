// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class HourGlobalPosition implements Entity {

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
        assert(id !== null, "Cannot save HourGlobalPosition entity without an ID");
        await store.set('HourGlobalPosition', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove HourGlobalPosition entity without an ID");
        await store.remove('HourGlobalPosition', id.toString());
    }

    static async get(id:string): Promise<HourGlobalPosition | undefined>{
        assert((id !== null && id !== undefined), "Cannot get HourGlobalPosition entity without an ID");
        const record = await store.get('HourGlobalPosition', id.toString());
        if (record){
            return HourGlobalPosition.create(record);
        }else{
            return;
        }
    }


    static async getByCollateralId(collateralId: string): Promise<HourGlobalPosition[] | undefined>{
      
      const records = await store.getByField('HourGlobalPosition', 'collateralId', collateralId);
      return records.map(record => HourGlobalPosition.create(record));
      
    }


    static create(record: Partial<Omit<HourGlobalPosition, FunctionPropertyNames<HourGlobalPosition>>> & Entity): HourGlobalPosition {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new HourGlobalPosition(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
