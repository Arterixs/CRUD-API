import { Model } from './model/model.service.ts';
import { App } from './app/app.service.ts';
import { Server } from './server/server.servise.ts';

import 'dotenv/config';

const { PORT } = process.env;

const app = new App(PORT, Server, Model);
app.start();
