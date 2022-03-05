// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type HourlyPositionProps = Omit<HourlyPosition, NonNullable<FunctionPropertyNames<HourlyPosition>>>;

export class HourlyPosition implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public ownerId: string;

    public collateralId: string;

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

    public txCount: number;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save HourlyPosition entity without an ID");
        await store.set('HourlyPosition', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove HourlyPosition entity without an ID");
        await store.remove('HourlyPosition', id.toString());
    }

    static async get(id:string): Promise<HourlyPosition | undefined>{
        assert((id !== null && id !== undefined), "Cannot get HourlyPosition entity without an ID");
        const record = await store.get('HourlyPosition', id.toString());
        if (record){
            return HourlyPosition.create(record as HourlyPositionProps);
        }else{
            return;
        }
    }


    static async getByOwnerId(ownerId: string): Promise<HourlyPosition[] | undefined>{
      
      const records = await store.getByField('HourlyPosition', 'ownerId', ownerId);
      return records.map(record => HourlyPosition.create(record as HourlyPositionProps));
      
    }

    static async getByCollateralId(collateralId: string): Promise<HourlyPosition[] | undefined>{
      
      const records = await store.getByField('HourlyPosition', 'collateralId', collateralId);
      return records.map(record => HourlyPosition.create(record as HourlyPositionProps));
      
    }


    static create(record: HourlyPositionProps): HourlyPosition {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new HourlyPosition(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
