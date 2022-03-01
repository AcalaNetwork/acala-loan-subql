// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class Extrinsic implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public hash?: string;

    public blockId?: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Extrinsic entity without an ID");
        await store.set('Extrinsic', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Extrinsic entity without an ID");
        await store.remove('Extrinsic', id.toString());
    }

    static async get(id:string): Promise<Extrinsic | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Extrinsic entity without an ID");
        const record = await store.get('Extrinsic', id.toString());
        if (record){
            return Extrinsic.create(record);
        }else{
            return;
        }
    }


    static async getByBlockId(blockId: string): Promise<Extrinsic[] | undefined>{
      
      const records = await store.getByField('Extrinsic', 'blockId', blockId);
      return records.map(record => Extrinsic.create(record));
      
    }


    static create(record: Partial<Omit<Extrinsic, FunctionPropertyNames<Extrinsic>>> & Entity): Extrinsic {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Extrinsic(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
