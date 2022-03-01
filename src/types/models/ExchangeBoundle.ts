// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class ExchangeBoundle implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public blockId?: string;

    public collateralId?: string;

    public debitExchangeRate?: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save ExchangeBoundle entity without an ID");
        await store.set('ExchangeBoundle', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove ExchangeBoundle entity without an ID");
        await store.remove('ExchangeBoundle', id.toString());
    }

    static async get(id:string): Promise<ExchangeBoundle | undefined>{
        assert((id !== null && id !== undefined), "Cannot get ExchangeBoundle entity without an ID");
        const record = await store.get('ExchangeBoundle', id.toString());
        if (record){
            return ExchangeBoundle.create(record);
        }else{
            return;
        }
    }


    static async getByBlockId(blockId: string): Promise<ExchangeBoundle[] | undefined>{
      
      const records = await store.getByField('ExchangeBoundle', 'blockId', blockId);
      return records.map(record => ExchangeBoundle.create(record));
      
    }

    static async getByCollateralId(collateralId: string): Promise<ExchangeBoundle[] | undefined>{
      
      const records = await store.getByField('ExchangeBoundle', 'collateralId', collateralId);
      return records.map(record => ExchangeBoundle.create(record));
      
    }


    static create(record: Partial<Omit<ExchangeBoundle, FunctionPropertyNames<ExchangeBoundle>>> & Entity): ExchangeBoundle {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new ExchangeBoundle(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
