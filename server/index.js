/*jshint esversion:6*/
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
let db = require('../models');
let ngrams = db.Ngrams;
/*const apiRoutes = require('./api');*/

const WebSocket = require('ws');
const http = require('http');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const users = [];
const rooms = new Map();
//rooms.set(new_room_id, new Room(new_room_id)) //when you accept an invite set the new room


let messageChain = { trigger: [], response: []};
let messageCache = [];
let modifiedMessage = '';
let tuples = [];

wss.on('connection', function connection(ws, req) {
  console.log("connected");
  let userId = ws._ultron.id;
  ws.userId = userId;

  users.push(ws);

  ws.on('message', function incoming(message) {

    let payload = JSON.parse(message);
    console.log('before payload',payload)

    switch (payload.OP) {
      case 'CHAT':
      switch(true){
      case (messageChain.trigger.length === 0):
      messageChain.trigger.push(payload.message);
      break;
      case (messageChain.trigger.length > 0 && messageChain.trigger[0].username != payload.message.username):
      messageChain.response.push(payload.message);
      modifiedMessage = payload.message.message
      .replace(/[.,\/#!$%@\^*\*;:{}=\-_`~()]/g,"")
      .replace(/\s{2,}/g,"").toLowerCase();
      messageCache.push(modifiedMessage);
      break;
      case (messageChain.trigger[0].username === payload.message.username && messageChain.response.length  === 0):
      messageChain.trigger.push(payload.message);
      break;
      case (messageChain.trigger[0].username === payload.message.username):
      //break up message chain then query DB
      console.log(messageCache);
      let cache = messageCache.join(' # ').split(' ');
      cache.reduce((trigger, response) => {
        let trigRes = [trigger, response];
        tuples.push(trigRes);
        console.log(tuples);
        return response;
      });
      messageChain.trigger = messageChain.response;
      messageChain.response = [payload.message];
      modifiedMessage = payload.message.message
      .replace(/[.,\/#!$%\^*\*;:{}=\-_`~()]/g,"")
      .replace(/\s{2,}/g,"").toLowerCase();
      messageCache = [modifiedMessage];
      tuples = [];
      break;
    }
      users.forEach(user => {
        user.send(
          JSON.stringify({
            OP: 'CHAT',
            message: payload.message.message,
            username: payload.message.username,
            id: payload.message.id
          })
          );
      });
      break;
      case 'CONNECTED':
      console.log('payload.message.username', payload.message.username)
      users.forEach(user => {
        user.send(
          JSON.stringify({
            OP: 'CREATED_USER',
            username: payload.message.username
          }))
      })
      console.log('a user has connected');
      break;
      case 'BROADCAST_USERNAME':
      console.log('payload.message.username', payload.message.username)
      users.forEach(user => {
        user.send(
          JSON.stringify({
            OP: 'CREATED_USER',
            username: payload.message.username
          }))
      })
      console.log('a user has connected');
      break;
      case 'SEND_INVITE':
      users.filter(user => {
        return user.userId === payload.userId;
      }).forEach((user) =>{
        console.log('inviting', user.userId)
        user.send(
          JSON.stringify({
            OP:'RECEIVE_INVITE',
            senderName: payload.message.username,
            senderId: payload.message.id
          }))
      });
      break;
      case 'ACCEPT_INVITE':
          //create user and send to room
          var player2 = ws;
          var player1 = users.find((user)=>{
            return user.userId === payload.senderId;
          });
          var room = new Room(player1, player2);
          rooms.set(room.id, room)
        console.log('accept invite', payload.senderName)
      break;
      case 'DECLINE_INVITE':
          //send to sender invite declined
        console.log('decline invite', payload.senderName)
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

/*
app.use('/api', apiRoutes);*/

server.listen(PORT,'0.0.0.0', ()=> {
    db.sequelize.sync();
  console.log(`listening on ${PORT}`);
});