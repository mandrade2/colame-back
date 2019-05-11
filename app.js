import http from 'http';
import express from 'express';

import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import path from 'path';
import routes from './routes/index';

const app = express();
const mongoDB = 'mongodb://127.0.0.1/colame_db';
const hostname = '127.0.0.1';
const port = 3000;
const db = mongoose.connection;
mongoose.connect(mongoDB, { useNewUrlParser: true });

const server = http.createServer(app);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

routes(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
});
