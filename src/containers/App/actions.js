export const GET_TEXT = 'GET_TEXT'
export const ADD_TEXT = 'ADD_TEXT'
export const EDIT_TEXT = 'EDIT_TEXT'
export const DELETE_TEXT = 'DELETE_TEXT'


export const getText = () => {
  return ( dispatch ) => {
    fetch('/api/text')
    .then(tasks => tasks.json())
    .then(tasks => {
      dispatch({
        type: GET_TEXT,
        payload: { tasks }
      })
    })
  }
}

/*export function addCard(card) {
  return { type: ADD_CARD,
           ...card
         }
}

export function editCard(card) {
  return { type: EDIT_CARD,
           card: card
         }
}

export function deleteCard(card) {
  return { type: DELETE_CARD,
           card: card
         }

}*/
