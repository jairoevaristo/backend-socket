import express from 'express';
import { createServer } from 'http';
import { Socket, Server } from 'socket.io';
import path from 'path';

import './database';
import { router } from './routes';

const app = express();

app.use(express.static(path.resolve(__dirname, '../', 'public')));
app.set('views', path.resolve(__dirname, '../', 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/pages/client', (request, response) => {
  return response.render('html/client.html');
})

app.get('/pages/admin', (request, response) => {
  return response.render('html/admin.html');
})

const http = createServer(app);
const io = new Server(http);

io.on('connection', (socket: Socket) => {
  // console.log(socket.id);
})

app.use(express.json());
app.use(router);

export { http, io };