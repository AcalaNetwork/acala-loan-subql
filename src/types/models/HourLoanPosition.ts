// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class HourLoanPosition implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public ownerId?: string;

    public collateralId?: string;

    public debitAmount?: bigint;

    public collateralAmount?: bigint;

    public debitExchangeRate?: bigint;

    public timestamp?: Date;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save HourLoanPosition entity without an ID");
        await store.set('HourLoanPosition', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove HourLoanPosition entity without an ID");
        await store.remove('HourLoanPosition', id.toString());
    }

    static async get(id:string): Promise<HourLoanPosition | undefined>{
        assert((id !== null && id !== undefined), "Cannot get HourLoanPosition entity without an ID");
        const record = await store.get('HourLoanPosition', id.toString());
        if (record){
            return HourLoanPosition.create(record);
        }else{
            return;
        }
    }


    static async getByOwnerId(ownerId: string): Promise<HourLoanPosition[] | undefined>{
      
      const records = await store.getByField('HourLoanPosition', 'ownerId', ownerId);
      return records.map(record => HourLoanPosition.create(record));
      
    }

    static async getByCollateralId(collateralId: string): Promise<HourLoanPosition[] | undefined>{
      
      const records = await store.getByField('HourLoanPosition', 'collateralId', collateralId);
      return records.map(record => HourLoanPosition.create(record));
      
    }


    static create(record: Partial<Omit<HourLoanPosition, FunctionPropertyNames<HourLoanPosition>>> & Entity): HourLoanPosition {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new HourLoanPosition(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
