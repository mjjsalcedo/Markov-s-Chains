export const GET_TEXT = 'GET_TEXT'
export const ADD_TEXT = 'ADD_TEXT'
export const EDIT_TEXT = 'EDIT_TEXT'
export const DELETE_TEXT = 'DELETE_TEXT'


export const getText = () => {
  console.log('hello')
  return ( dispatch ) => {
    fetch('/api/texts')
    .then(texts => texts.json())
    .then(texts => {
      console.log('boop');
      dispatch({
        type: GET_TEXT,
        payload: texts
      })
    })
  }
}

export const addText = (text) => {
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