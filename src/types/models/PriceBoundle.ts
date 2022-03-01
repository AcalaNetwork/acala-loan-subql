// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class PriceBoundle implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public blockId?: string;

    public collateralId?: string;

    public price?: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save PriceBoundle entity without an ID");
        await store.set('PriceBoundle', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove PriceBoundle entity without an ID");
        await store.remove('PriceBoundle', id.toString());
    }

    static async get(id:string): Promise<PriceBoundle | undefined>{
        assert((id !== null && id !== undefined), "Cannot get PriceBoundle entity without an ID");
        const record = await store.get('PriceBoundle', id.toString());
        if (record){
            return PriceBoundle.create(record);
        }else{
            return;
        }
    }


    static async getByBlockId(blockId: string): Promise<PriceBoundle[] | undefined>{
      
      const records = await store.getByField('PriceBoundle', 'blockId', blockId);
      return records.map(record => PriceBoundle.create(record));
      
    }

    static async getByCollateralId(collateralId: string): Promise<PriceBoundle[] | undefined>{
      
      const records = await store.getByField('PriceBoundle', 'collateralId', collateralId);
      return records.map(record => PriceBoundle.create(record));
      
    }


    static create(record: Partial<Omit<PriceBoundle, FunctionPropertyNames<PriceBoundle>>> & Entity): PriceBoundle {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new PriceBoundle(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
