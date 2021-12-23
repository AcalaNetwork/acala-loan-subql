// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class Collateral implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public decimal?: number;

    public token?: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Collateral entity without an ID");
        await store.set('Collateral', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Collateral entity without an ID");
        await store.remove('Collateral', id.toString());
    }

    static async get(id:string): Promise<Collateral | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Collateral entity without an ID");
        const record = await store.get('Collateral', id.toString());
        if (record){
            return Collateral.create(record);
        }else{
            return;
        }
    }



    static create(record: Partial<Omit<Collateral, FunctionPropertyNames<Collateral>>> & Entity): Collateral {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Collateral(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
