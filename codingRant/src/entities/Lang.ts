import {Entity,PrimaryKey, Collection, OneToMany} from '@mikro-orm/core';
import { Submission } from './submission';

@Entity()
export class Lang {

  @PrimaryKey()
  id!: String;

  @OneToMany(()=>Submission, submission=>submission.type)
  submissions=new Collection<Submission>(this);

  constructor( id: String ) {
    this.id = id;
  }

}