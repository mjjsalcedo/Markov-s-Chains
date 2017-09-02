import { MESSAGE_SEND, USER_CONNECT, MESSAGE_RECEIVED, SUCCESSFUL_CONNECTION, USER_DISCONNECTED, CREATE_USERNAME, DECLINE_INVITE, CHAT, CREATED_USER, RECEIVE_INVITE, ENTER_ROOM, BROADCAST_MESSAGE, BROADCAST_SCORE, GAME_STATUS, RECEIVE_REPLAY_INVITE, UPDATED_PLAYERS, REJOIN_LOBBY} from './actions';

let initialState = {
  userData:[],
  invitesFrom : null,
  goToRoom : false,
  player1 : null,
  player2 : null,
  roomId: null,
  isVisible: [],
  score: '',
  gameResults:[],
  winningStatus: null,
  reinvitesFrom: null};

  const textReducers = (state = initialState, action) => {

    switch (action.type) {
    case MESSAGE_SEND:
    return {
      ...state,
      userData: [
      ...state.userData,
      { id: action.payload.id,
        username: action.payload.username,
        message: action.payload.message
      }
      ]
    }
    case USER_CONNECT:
    return {
      ...state
    }
    case MESSAGE_RECEIVED:
    return messageReceived(state, action);
    case GAME_STATUS:
    return {
      ...state,
      winningStatus: action.payload.result
    }
    case CREATE_USERNAME:
    return createUsername(state, action);
    default:
    return state;
  }
}

function messageReceived(state, action) {
  let messagePayload = JSON.parse(action.payload);
  console.log('fnhuadsbfuadgfbiasduiouid', messagePayload);
  switch (messagePayload.OP) {

    case SUCCESSFUL_CONNECTION:
    return localStorage.setItem("id", messagePayload.userId)
    case BROADCAST_MESSAGE:
    if (state.userData.length <= 4){
    return {
      ...state,
      userData: [
      ...state.userData,
      { message: messagePayload.message }],
      gameResults: [ ...state.gameResults],
      winningStatus: null,
      isVisible: [...state.isVisible]
    }
    }else{
      let lastFiveMessages = state.userData.slice(-4);
      console.log(lastFiveMessages);
      return {
        ...state,
        userData: [
        ...lastFiveMessages,
        { message: messagePayload.message }
        ],
        gameResults: [...state.gameResults],
        winningStatus: null,
        isVisible: [...state.isVisible]
      }
    }
    case BROADCAST_SCORE:
    return {
      ...state,
      userData: [ ...state.userData ],
      gameResults: [ ...state.gameResults,
      messagePayload.score ],
      winningStatus: null,
      isVisible: [...state.isVisible, messagePayload.isVisible]
    }
    case RECEIVE_INVITE:
    return {
      ...state,
      userData: [
      ...state.userData
      ],  invitesFrom: messagePayload.sender
    }
    case RECEIVE_REPLAY_INVITE:
    return {
      ...state
      ,reinvitesFrom: messagePayload.sender
    }
    case ENTER_ROOM:
    if(messagePayload.player1 === localStorage.getItem("username")){
      localStorage.setItem("player", "player1")
    } else {
      localStorage.setItem("player", "player2")
    }
    localStorage.setItem("roomId", messagePayload.roomId)
    return {
      userData: [],
      player1 : messagePayload.player1,
      player2 : messagePayload.player2,
      roomId : messagePayload.roomId,
      goToRoom : true,
      gameResults:[],
      isVisible: [],
      score: '',
      gameResults:[],
      winningStatus: null,
      reinvitesFrom: null
    }
    case CREATED_USER:
    return {
      ...state,
      userData: [
      ...state.userData,
      { username:messagePayload.username }
      ]
    }
    case CHAT:
    return {
      ...state
    }
    case UPDATED_PLAYERS:
    return {
      ...state,
      userData: [
      ...messagePayload.username
      ]
    }
    case REJOIN_LOBBY:
    console.log('made it to rejoin lobby', messagePayload.username)
    return {
      userData: [
      messagePayload.username
      ],
      gameResults:[],
      isVisible: [],
      score: '',
      gameResults:[],
      winningStatus: null,
      invitesFrom: null,
      goToLobby: true
    }
    default:
    return state;
  }
}

function createUsername(state, action) {
  localStorage.setItem("username", action.payload.username)
  return {
     ...state,
    userData: [
    ...state.userData]
  }
}

export default textReducers
