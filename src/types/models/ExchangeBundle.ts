// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type ExchangeBundleProps = Omit<ExchangeBundle, NonNullable<FunctionPropertyNames<ExchangeBundle>>>;

export class ExchangeBundle implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public blockId: string;

    public collateralId: string;

    public debitExchangeRate: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save ExchangeBundle entity without an ID");
        await store.set('ExchangeBundle', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove ExchangeBundle entity without an ID");
        await store.remove('ExchangeBundle', id.toString());
    }

    static async get(id:string): Promise<ExchangeBundle | undefined>{
        assert((id !== null && id !== undefined), "Cannot get ExchangeBundle entity without an ID");
        const record = await store.get('ExchangeBundle', id.toString());
        if (record){
            return ExchangeBundle.create(record as ExchangeBundleProps);
        }else{
            return;
        }
    }


    static async getByBlockId(blockId: string): Promise<ExchangeBundle[] | undefined>{
      
      const records = await store.getByField('ExchangeBundle', 'blockId', blockId);
      return records.map(record => ExchangeBundle.create(record as ExchangeBundleProps));
      
    }

    static async getByCollateralId(collateralId: string): Promise<ExchangeBundle[] | undefined>{
      
      const records = await store.getByField('ExchangeBundle', 'collateralId', collateralId);
      return records.map(record => ExchangeBundle.create(record as ExchangeBundleProps));
      
    }


    static create(record: ExchangeBundleProps): ExchangeBundle {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new ExchangeBundle(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
