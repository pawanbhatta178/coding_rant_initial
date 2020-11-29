import {Entity,PrimaryKey,Property, ManyToOne} from '@mikro-orm/core';
import {Lang} from './Lang';
@Entity()
export class Submission {

  @PrimaryKey()
  id!: number;

  @Property()
  submittedAt = new Date();

  @Property({onUpdate:()=>new Date()})
  updatedAt=new Date();

  @ManyToOne(()=>Lang)
  type!: Lang;

  @Property()
  code!:String;


  constructor( type: Lang, code:String ) {
    this.type = type;
    this.code=code;
  }

}