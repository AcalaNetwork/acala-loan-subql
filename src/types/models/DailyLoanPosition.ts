// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class DailyLoanPosition implements Entity {

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
        assert(id !== null, "Cannot save DailyLoanPosition entity without an ID");
        await store.set('DailyLoanPosition', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove DailyLoanPosition entity without an ID");
        await store.remove('DailyLoanPosition', id.toString());
    }

    static async get(id:string): Promise<DailyLoanPosition | undefined>{
        assert((id !== null && id !== undefined), "Cannot get DailyLoanPosition entity without an ID");
        const record = await store.get('DailyLoanPosition', id.toString());
        if (record){
            return DailyLoanPosition.create(record);
        }else{
            return;
        }
    }


    static async getByOwnerId(ownerId: string): Promise<DailyLoanPosition[] | undefined>{
      
      const records = await store.getByField('DailyLoanPosition', 'ownerId', ownerId);
      return records.map(record => DailyLoanPosition.create(record));
      
    }

    static async getByCollateralId(collateralId: string): Promise<DailyLoanPosition[] | undefined>{
      
      const records = await store.getByField('DailyLoanPosition', 'collateralId', collateralId);
      return records.map(record => DailyLoanPosition.create(record));
      
    }


    static create(record: Partial<Omit<DailyLoanPosition, FunctionPropertyNames<DailyLoanPosition>>> & Entity): DailyLoanPosition {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new DailyLoanPosition(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
