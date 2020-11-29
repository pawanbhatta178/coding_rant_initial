import {MikroORM} from '@mikro-orm/core';
import {__prod__} from "./constants";
import { Lang } from './entities/Lang';
import { Submission } from './entities/submission';
import microConfig from './mikro-orm.config';
const main=async()=>{
    const orm=await MikroORM.init(microConfig);
    await orm.getMigrator().up();
    const language=orm.em.create(Lang,{id:'js'});
    const sub=orm.em.create(Submission,{type:language,code:"console.log(1+1)"});
    await orm.em.persistAndFlush(sub);

}
main().catch(err=>{
    console.error(err);
});  