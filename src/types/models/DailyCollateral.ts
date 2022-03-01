// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type DailyCollateralProps = Omit<DailyCollateral, NonNullable<FunctionPropertyNames<DailyCollateral>>>;

export class DailyCollateral implements Entity {

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
        assert(id !== null, "Cannot save DailyCollateral entity without an ID");
        await store.set('DailyCollateral', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove DailyCollateral entity without an ID");
        await store.remove('DailyCollateral', id.toString());
    }

    static async get(id:string): Promise<DailyCollateral | undefined>{
        assert((id !== null && id !== undefined), "Cannot get DailyCollateral entity without an ID");
        const record = await store.get('DailyCollateral', id.toString());
        if (record){
            return DailyCollateral.create(record as DailyCollateralProps);
        }else{
            return;
        }
    }


    static async getByCollateralId(collateralId: string): Promise<DailyCollateral[] | undefined>{
      
      const records = await store.getByField('DailyCollateral', 'collateralId', collateralId);
      return records.map(record => DailyCollateral.create(record as DailyCollateralProps));
      
    }


    static create(record: DailyCollateralProps): DailyCollateral {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new DailyCollateral(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
