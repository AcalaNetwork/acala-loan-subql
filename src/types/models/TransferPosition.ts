// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type TransferPositionProps = Omit<TransferPosition, NonNullable<FunctionPropertyNames<TransferPosition>>>;

export class TransferPosition implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public collateralId?: string;

    public fromId?: string;

    public toId?: string;

    public blockId?: string;

    public extrinsicId?: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save TransferPosition entity without an ID");
        await store.set('TransferPosition', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove TransferPosition entity without an ID");
        await store.remove('TransferPosition', id.toString());
    }

    static async get(id:string): Promise<TransferPosition | undefined>{
        assert((id !== null && id !== undefined), "Cannot get TransferPosition entity without an ID");
        const record = await store.get('TransferPosition', id.toString());
        if (record){
            return TransferPosition.create(record as TransferPositionProps);
        }else{
            return;
        }
    }


    static async getByCollateralId(collateralId: string): Promise<TransferPosition[] | undefined>{
      
      const records = await store.getByField('TransferPosition', 'collateralId', collateralId);
      return records.map(record => TransferPosition.create(record as TransferPositionProps));
      
    }

    static async getByFromId(fromId: string): Promise<TransferPosition[] | undefined>{
      
      const records = await store.getByField('TransferPosition', 'fromId', fromId);
      return records.map(record => TransferPosition.create(record as TransferPositionProps));
      
    }

    static async getByToId(toId: string): Promise<TransferPosition[] | undefined>{
      
      const records = await store.getByField('TransferPosition', 'toId', toId);
      return records.map(record => TransferPosition.create(record as TransferPositionProps));
      
    }

    static async getByBlockId(blockId: string): Promise<TransferPosition[] | undefined>{
      
      const records = await store.getByField('TransferPosition', 'blockId', blockId);
      return records.map(record => TransferPosition.create(record as TransferPositionProps));
      
    }

    static async getByExtrinsicId(extrinsicId: string): Promise<TransferPosition[] | undefined>{
      
      const records = await store.getByField('TransferPosition', 'extrinsicId', extrinsicId);
      return records.map(record => TransferPosition.create(record as TransferPositionProps));
      
    }


    static create(record: TransferPositionProps): TransferPosition {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new TransferPosition(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
