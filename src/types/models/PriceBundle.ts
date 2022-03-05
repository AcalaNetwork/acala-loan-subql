// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type PriceBundleProps = Omit<PriceBundle, NonNullable<FunctionPropertyNames<PriceBundle>>>;

export class PriceBundle implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public blockId: string;

    public collateralId: string;

    public price: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save PriceBundle entity without an ID");
        await store.set('PriceBundle', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove PriceBundle entity without an ID");
        await store.remove('PriceBundle', id.toString());
    }

    static async get(id:string): Promise<PriceBundle | undefined>{
        assert((id !== null && id !== undefined), "Cannot get PriceBundle entity without an ID");
        const record = await store.get('PriceBundle', id.toString());
        if (record){
            return PriceBundle.create(record as PriceBundleProps);
        }else{
            return;
        }
    }


    static async getByBlockId(blockId: string): Promise<PriceBundle[] | undefined>{
      
      const records = await store.getByField('PriceBundle', 'blockId', blockId);
      return records.map(record => PriceBundle.create(record as PriceBundleProps));
      
    }

    static async getByCollateralId(collateralId: string): Promise<PriceBundle[] | undefined>{
      
      const records = await store.getByField('PriceBundle', 'collateralId', collateralId);
      return records.map(record => PriceBundle.create(record as PriceBundleProps));
      
    }


    static create(record: PriceBundleProps): PriceBundle {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new PriceBundle(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
