// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type DailyPositionProps = Omit<DailyPosition, NonNullable<FunctionPropertyNames<DailyPosition>>>;

export class DailyPosition implements Entity {

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
            return DailyPosition.create(record as DailyPositionProps);
        }else{
            return;
        }
    }


    static async getByOwnerId(ownerId: string): Promise<DailyPosition[] | undefined>{
      
      const records = await store.getByField('DailyPosition', 'ownerId', ownerId);
      return records.map(record => DailyPosition.create(record as DailyPositionProps));
      
    }

    static async getByCollateralId(collateralId: string): Promise<DailyPosition[] | undefined>{
      
      const records = await store.getByField('DailyPosition', 'collateralId', collateralId);
      return records.map(record => DailyPosition.create(record as DailyPositionProps));
      
    }


    static create(record: DailyPositionProps): DailyPosition {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new DailyPosition(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
