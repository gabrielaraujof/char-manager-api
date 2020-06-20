import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

export abstract class Creature {
  @Column()
  name: string;

  @Column()
  alignment: Alignment;

  @Column()
  healthPoints: number;

  @Column()
  speed: number;

  @Column()
  strength: number;

  @Column()
  dexterity: number;

  @Column()
  constitution: number;

  @Column()
  intelligence: number;

  @Column()
  wisdom: number;

  @Column()
  charisma: number;
}

export enum Alignment {
  LawfulGood,
  NeutralGood,
  ChaoticGood,
  LawfulNeutral,
  Neutral,
  ChaoticNeutral,
  LawfulEvil,
  NeutralEvil,
  ChaoticEvil,
}

@Entity()
export class Character extends Creature {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  level: number;
}
