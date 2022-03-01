// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class HourPosition implements Entity {

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
        assert(id !== null, "Cannot save HourPosition entity without an ID");
        await store.set('HourPosition', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove HourPosition entity without an ID");
        await store.remove('HourPosition', id.toString());
    }

    static async get(id:string): Promise<HourPosition | undefined>{
        assert((id !== null && id !== undefined), "Cannot get HourPosition entity without an ID");
        const record = await store.get('HourPosition', id.toString());
        if (record){
            return HourPosition.create(record);
        }else{
            return;
        }
    }


    static async getByOwnerId(ownerId: string): Promise<HourPosition[] | undefined>{
      
      const records = await store.getByField('HourPosition', 'ownerId', ownerId);
      return records.map(record => HourPosition.create(record));
      
    }

    static async getByCollateralId(collateralId: string): Promise<HourPosition[] | undefined>{
      
      const records = await store.getByField('HourPosition', 'collateralId', collateralId);
      return records.map(record => HourPosition.create(record));
      
    }


    static create(record: Partial<Omit<HourPosition, FunctionPropertyNames<HourPosition>>> & Entity): HourPosition {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new HourPosition(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
