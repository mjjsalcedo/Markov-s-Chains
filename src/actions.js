const socket = new WebSocket('ws://10.0.1.149:3001');

export const GET_TEXT = 'GET_TEXT'
export const ADD_TEXT = 'ADD_TEXT'
export const EDIT_TEXT = 'EDIT_TEXT'
export const DELETE_TEXT = 'DELETE_TEXT'
export const MESSAGE_SEND = 'MESSAGE_SEND'
export const USER_CONNECT = "USER_CONNECT"
export const USER_DISCONNECT = "USER_DISCONNECT"

export const getText = () => {
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

export const userConnect = () => {
  return ( dispatch ) => {
    socket.addEventListener('open', () => {
      dispatch({ type: USER_CONNECT, success: true, payload: 'user has connected' })
    })
  }
}






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