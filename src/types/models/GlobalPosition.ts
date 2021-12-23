// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class GlobalPosition implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public collateralId?: string;

    public debitAmount?: bigint;

    public collateralAmount?: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save GlobalPosition entity without an ID");
        await store.set('GlobalPosition', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove GlobalPosition entity without an ID");
        await store.remove('GlobalPosition', id.toString());
    }

    static async get(id:string): Promise<GlobalPosition | undefined>{
        assert((id !== null && id !== undefined), "Cannot get GlobalPosition entity without an ID");
        const record = await store.get('GlobalPosition', id.toString());
        if (record){
            return GlobalPosition.create(record);
        }else{
            return;
        }
    }


    static async getByCollateralId(collateralId: string): Promise<GlobalPosition[] | undefined>{
      
      const records = await store.getByField('GlobalPosition', 'collateralId', collateralId);
      return records.map(record => GlobalPosition.create(record));
      
    }


    static create(record: Partial<Omit<GlobalPosition, FunctionPropertyNames<GlobalPosition>>> & Entity): GlobalPosition {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new GlobalPosition(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
