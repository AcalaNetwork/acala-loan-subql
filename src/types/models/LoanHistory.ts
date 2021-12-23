// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class LoanHistory implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public ownerId?: string;

    public collateralId?: string;

    public type?: string;

    public atBlock?: bigint;

    public atBlockHash?: string;

    public atExtrinsicHash?: string;

    public timestamp?: Date;

    public collateralAjustment?: bigint;

    public debitAjustment?: bigint;

    public soldCollateralAmount?: bigint;

    public refundCollateralAmount?: bigint;

    public debitValue?: bigint;

    public collateralAmount?: bigint;

    public badDebitValue?: bigint;

    public liquidationStrategy?: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save LoanHistory entity without an ID");
        await store.set('LoanHistory', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove LoanHistory entity without an ID");
        await store.remove('LoanHistory', id.toString());
    }

    static async get(id:string): Promise<LoanHistory | undefined>{
        assert((id !== null && id !== undefined), "Cannot get LoanHistory entity without an ID");
        const record = await store.get('LoanHistory', id.toString());
        if (record){
            return LoanHistory.create(record);
        }else{
            return;
        }
    }


    static async getByOwnerId(ownerId: string): Promise<LoanHistory[] | undefined>{
      
      const records = await store.getByField('LoanHistory', 'ownerId', ownerId);
      return records.map(record => LoanHistory.create(record));
      
    }

    static async getByCollateralId(collateralId: string): Promise<LoanHistory[] | undefined>{
      
      const records = await store.getByField('LoanHistory', 'collateralId', collateralId);
      return records.map(record => LoanHistory.create(record));
      
    }


    static create(record: Partial<Omit<LoanHistory, FunctionPropertyNames<LoanHistory>>> & Entity): LoanHistory {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new LoanHistory(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
