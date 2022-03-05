// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type HourlyCollateralProps = Omit<HourlyCollateral, NonNullable<FunctionPropertyNames<HourlyCollateral>>>;

export class HourlyCollateral implements Entity {

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
        assert(id !== null, "Cannot save HourlyCollateral entity without an ID");
        await store.set('HourlyCollateral', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove HourlyCollateral entity without an ID");
        await store.remove('HourlyCollateral', id.toString());
    }

    static async get(id:string): Promise<HourlyCollateral | undefined>{
        assert((id !== null && id !== undefined), "Cannot get HourlyCollateral entity without an ID");
        const record = await store.get('HourlyCollateral', id.toString());
        if (record){
            return HourlyCollateral.create(record as HourlyCollateralProps);
        }else{
            return;
        }
    }


    static async getByCollateralId(collateralId: string): Promise<HourlyCollateral[] | undefined>{
      
      const records = await store.getByField('HourlyCollateral', 'collateralId', collateralId);
      return records.map(record => HourlyCollateral.create(record as HourlyCollateralProps));
      
    }


    static create(record: HourlyCollateralProps): HourlyCollateral {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new HourlyCollateral(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
