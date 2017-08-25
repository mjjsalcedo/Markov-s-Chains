/*jshint esversion:6*/
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
/*const apiRoutes = require('./api');*/

const WebSocket = require('ws');
const http = require('http');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const users = [];

wss.on('connection', function connection(ws, req) {
  console.log("connected");
  let userId = ws._ultron.id
  users.push(ws);

  ws.on('message', function incoming(message) {
    const payload = JSON.parse(message);
    // console.log('received: %s', payload);

    switch (payload.OP) {
      case 'CHAT': // broadcast
        users.forEach(user => {
          user.send(
            JSON.stringify({
              OP: 'CHAT',
              message: payload.message.message,
              username: payload.username
            })
          );
        });
        break;
      case 'CONNECTED':
        console.log('a user has connected');
        break;
    }
  });

  ws.send(
    JSON.stringify({
      OP: 'SUCCESSFUL_CONNECTION',
      userId
    })
  );
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*let db = require('../models');

app.use('/api', apiRoutes);*/

server.listen(PORT,'0.0.0.0', ()=> {
/*  db.sequelize.sync({force:true});*/
  console.log(`listening on ${PORT}`);
});