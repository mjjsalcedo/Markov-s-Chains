const socket = new WebSocket('ws://10.0.1.52:3001');

/*export const GET_TEXT = 'GET_TEXT'
export const ADD_TEXT = 'ADD_TEXT'
export const EDIT_TEXT = 'EDIT_TEXT'
export const DELETE_TEXT = 'DELETE_TEXT'
export const USER_DISCONNECT = "USER_DISCONNECT"*/
export const MESSAGE_SEND = 'MESSAGE_SEND'
export const USER_CONNECT = "USER_CONNECT"
export const SUCCESSFUL_CONNECTION = "SUCCESSFUL_CONNECTION"
export const USER_DISCONNECTED = "USER_DISCONNECTED"
export const CREATE_USERNAME = "CREATE_USERNAME"
export const MESSAGE_RECEIVED = "MESSAGE_RECEIVED"
export const SEND_INVITE = "SEND_INVITE"
export const ACCEPT_INVITE = "ACCEPT_INVITE"
export const DECLINE_INVITE = "DECLINE_INVITE"
export const CHAT = "CHAT"
export const CREATED_USER = "CREATED_USER"
export const CONNECTED = "CONNECTED"
export const BROADCAST_USERNAME = "BROADCAST_USERNAME"
export const RECEIVE_INVITE = "RECEIVE_INVITE"
export const ENTER_ROOM = "ENTER_ROOM"
export const BROADCAST_MESSAGE = "BROADCAST_MESSAGE"
export const BROADCAST_SCORE = "BROADCAST_SCORE"
export const GAME_RESULTS = "GAME_RESULTS"
export const NEW_GAME = "NEW_GAME"
export const GAME_STATUS = "GAME_STATUS"
export const RECEIVE_REPLAY_INVITE = "RECEIVE_REPLAY_INVITE"
export const REPLAY = "REPLAY"


export const userConnect = () => {
  return ( dispatch ) => {
    socket.addEventListener('open', () => {
      dispatch({ type: USER_CONNECT, success: true, payload: 'user has connected' })
    })
    socket.addEventListener('message', (message) => {
      console.log('fhuiadhfndifha', message.data)
      dispatch({ type: MESSAGE_RECEIVED, success: true, payload: message.data})
    })
  }
}

export const createUsername = (username) => {
  return ( dispatch ) => {
    socket.send(JSON.stringify({
      OP: CONNECTED,
      message: username
    }))
    dispatch({ type: CREATE_USERNAME, success: true, payload: username })
  }
}

export const broadcastUsers = ( username ) => {
  return ( dispatch ) => {
    socket.send(JSON.stringify({
      OP: BROADCAST_USERNAME,
      username}));
  }
}

export const messageSend = ( message ) => {
  return ( dispatch ) => {
    socket.send(JSON.stringify({
      OP: CHAT,
      message}));
  }
}

export const sendInvite = ( invite ) => {
  return ( dispatch ) => {
    socket.send(JSON.stringify({
      OP: SEND_INVITE,
      invite}));
  }
}

export const acceptInvite = (invitesFrom) => dispatch => {
  socket.send(
    JSON.stringify({
      OP: ACCEPT_INVITE,
      username : invitesFrom
    })
  );

};

export const declineInvite = (invitesFrom) => dispatch => {
  socket.send(
    JSON.stringify({
      OP: DECLINE_INVITE,
      username : invitesFrom
    })
  );

};

export const gameResults = (results) => dispatch => {
  socket.send(
    JSON.stringify({
      OP: GAME_RESULTS,
      score : results
    })
  );

};

export const checkGameStatus = (results) => dispatch => {
    dispatch({ type: GAME_STATUS, success: true, payload: results });
};

export const replayGame = (partner) => dispatch => {
  socket.send(
    JSON.stringify({
      OP: NEW_GAME,
      username : partner
    })
  );

};

export const anotherInvite = ( invite ) => {
  return ( dispatch ) => {
    socket.send(JSON.stringify({
      OP: REPLAY,
      invite}));
  }
}





















/*export const getText = () => {
  return ( dispatch ) => {
    fetch('/api/texts')
    .then(texts => texts.json())
    .then(texts => {
      dispatch({
        type: GET_TEXT,
        payload: texts
      })
    })
  }
}
export const addText = (text) => {
  return ( dispatch ) => {
    fetch('/api/texts', {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, ',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(text)
    })
    .then(words => words.json())
    .then(words => {
      dispatch({
        type: ADD_TEXT,
        payload: words
      })
    })
  }
}
*/





/*export function editCard(card) {
  return { type: EDIT_CARD,
           card: card
         }
}
export function deleteCard(card) {
  return { type: DELETE_CARD,
           card: card
         }
}
*/