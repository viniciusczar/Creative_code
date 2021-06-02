import express from 'express';
import cors from 'cors';
import './database/connection';
import routes from './routes';

const app = express ();
app.use(cors());
app.use(express.json());
app.use(routes);

console.log('rodando');
app.listen(3331);