// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class HourCollateral implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public collateralId?: string;

    public depositVolume?: bigint;

    public debitVolume?: bigint;

    public totalDepositVolumeUSD?: bigint;

    public totalDebitVolumeUSD?: bigint;

    public debitExchangeRate?: bigint;

    public timestamp?: Date;

    public txCount?: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save HourCollateral entity without an ID");
        await store.set('HourCollateral', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove HourCollateral entity without an ID");
        await store.remove('HourCollateral', id.toString());
    }

    static async get(id:string): Promise<HourCollateral | undefined>{
        assert((id !== null && id !== undefined), "Cannot get HourCollateral entity without an ID");
        const record = await store.get('HourCollateral', id.toString());
        if (record){
            return HourCollateral.create(record);
        }else{
            return;
        }
    }


    static async getByCollateralId(collateralId: string): Promise<HourCollateral[] | undefined>{
      
      const records = await store.getByField('HourCollateral', 'collateralId', collateralId);
      return records.map(record => HourCollateral.create(record));
      
    }


    static create(record: Partial<Omit<HourCollateral, FunctionPropertyNames<HourCollateral>>> & Entity): HourCollateral {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new HourCollateral(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
