// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type PositionProps = Omit<Position, NonNullable<FunctionPropertyNames<Position>>>;

export class Position implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public ownerId?: string;

    public collateralId?: string;

    public depositVolume?: bigint;

    public debitVolume?: bigint;

    public updateAtId?: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Position entity without an ID");
        await store.set('Position', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Position entity without an ID");
        await store.remove('Position', id.toString());
    }

    static async get(id:string): Promise<Position | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Position entity without an ID");
        const record = await store.get('Position', id.toString());
        if (record){
            return Position.create(record as PositionProps);
        }else{
            return;
        }
    }


    static async getByOwnerId(ownerId: string): Promise<Position[] | undefined>{
      
      const records = await store.getByField('Position', 'ownerId', ownerId);
      return records.map(record => Position.create(record as PositionProps));
      
    }

    static async getByCollateralId(collateralId: string): Promise<Position[] | undefined>{
      
      const records = await store.getByField('Position', 'collateralId', collateralId);
      return records.map(record => Position.create(record as PositionProps));
      
    }

    static async getByUpdateAtId(updateAtId: string): Promise<Position[] | undefined>{
      
      const records = await store.getByField('Position', 'updateAtId', updateAtId);
      return records.map(record => Position.create(record as PositionProps));
      
    }


    static create(record: PositionProps): Position {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Position(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
