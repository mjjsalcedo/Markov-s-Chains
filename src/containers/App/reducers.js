import { GET_TEXT, ADD_TEXT, EDIT_TEXT, DELETE_TEXT } from './actions';

let id = 0;

const textReducers = (state = [], action) => {
  switch (action.type) {
    case GET_TEXT:
      return getText(state, action);
    case ADD_TEXT:
      return addText(state, action);
    case EDIT_TEXT:
      return editText(state, action);
    case DELETE_TEXT:
      return deleteText(state, action);
    default:
      return state;
  }
}

function getText(state, action){
  console.log('hello',action.payload)
  return action.payload
}

function addText(state, action) {
  id = ++id;
  return [
    ...state,
    {
      id: id,
      title: action.title,
      priority: action.priority,
      status: action.status,
      createdBy: action.createdBy,
      assignedTo: action.assignedTo
    }
  ];
}

function editText(state, action) {
  var textEdits = action.text
  var newState = state.filter(text=> {
    return text.id !== action.text.id
  });

  return [
  ...newState, {
      id: textEdits.id,
      title: textEdits.title,
      priority: textEdits.priority,
      status: textEdits.status,
      createdBy: textEdits.createdBy,
      assignedTo: textEdits.assignedTo
    }]

}

function deleteText(state, action) {
  return state.filter(text=> {
    return text.id !== action.text
  })
}

export default textReducers