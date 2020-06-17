import { Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class Character {
    @ObjectIdColumn()
    id: ObjectID;
}
