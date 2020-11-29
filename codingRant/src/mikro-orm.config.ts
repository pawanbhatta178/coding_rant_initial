import { __prod__ } from "./constants";
import { Lang } from "./entities/Lang";
import { Submission } from "./entities/submission";
import {MikroORM} from "@mikro-orm/core";
import path from 'path';

export default {
    migrations:{
        path: path.join(__dirname,'./migrations'), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/ // regex pattern for the migration files
    },
    entities:[Submission,Lang],
    dbName:"codingrant",
    type:"postgresql",
    debug:!__prod__,
} as Parameters<typeof MikroORM.init>[0];
