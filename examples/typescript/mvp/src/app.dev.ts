import { app } from './app';
import { FileDb } from '@jovotech/db-filedb';
import {MainComponent} from "./components/MainComponent/MainComponent";
console.log('DEV STAGE')
/*
|--------------------------------------------------------------------------
| STAGE CONFIGURATION
|--------------------------------------------------------------------------
|
| This configuration gets merged into the default app config
| Learn more here: www.jovo.tech/docs/staging
|
*/
app.use(
    new FileDb({
      pathToFile: './../../db/db.json',
    }),
 );

export * from './server.express';