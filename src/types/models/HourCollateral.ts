// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type HourCollateralProps = Omit<HourCollateral, NonNullable<FunctionPropertyNames<HourCollateral>>>;

export class HourCollateral implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public collateralId: string;

    public txCount: number;

    public depositAmount: bigint;

    public debitAmount: bigint;

    public depositVolumeUSD: bigint;

    public debitVolumeUSD: bigint;

    public depositChanged: bigint;

    public debitChanged: bigint;

    public depositChangedUSD: bigint;

    public debitChangedUSD: bigint;

    public debitExchangeRate: bigint;

    public timestamp: Date;


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
            return HourCollateral.create(record as HourCollateralProps);
        }else{
            return;
        }
    }


    static async getByCollateralId(collateralId: string): Promise<HourCollateral[] | undefined>{
      
      const records = await store.getByField('HourCollateral', 'collateralId', collateralId);
      return records.map(record => HourCollateral.create(record as HourCollateralProps));
      
    }


    static create(record: HourCollateralProps): HourCollateral {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new HourCollateral(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
