import { ADD_SHOOT, GET_SHOOT } from '../actions/shoot.action'

const initialState = []

export default function shootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SHOOT:
      return action.payload
    case ADD_SHOOT:
      return [action.payload, ...state]
    default:
      return state
  }
}
