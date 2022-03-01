// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class DailyPosition implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public ownerId?: string;

    public collateralId?: string;

    public depositVolume?: bigint;

    public debitVolume?: bigint;

    public depositVolumeUSD?: bigint;

    public debitVolumeUSD?: bigint;

    public debitExchangeRate?: bigint;

    public timestamp?: Date;

    public txCount?: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save DailyPosition entity without an ID");
        await store.set('DailyPosition', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove DailyPosition entity without an ID");
        await store.remove('DailyPosition', id.toString());
    }

    static async get(id:string): Promise<DailyPosition | undefined>{
        assert((id !== null && id !== undefined), "Cannot get DailyPosition entity without an ID");
        const record = await store.get('DailyPosition', id.toString());
        if (record){
            return DailyPosition.create(record);
        }else{
            return;
        }
    }


    static async getByOwnerId(ownerId: string): Promise<DailyPosition[] | undefined>{
      
      const records = await store.getByField('DailyPosition', 'ownerId', ownerId);
      return records.map(record => DailyPosition.create(record));
      
    }

    static async getByCollateralId(collateralId: string): Promise<DailyPosition[] | undefined>{
      
      const records = await store.getByField('DailyPosition', 'collateralId', collateralId);
      return records.map(record => DailyPosition.create(record));
      
    }


    static create(record: Partial<Omit<DailyPosition, FunctionPropertyNames<DailyPosition>>> & Entity): DailyPosition {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new DailyPosition(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
