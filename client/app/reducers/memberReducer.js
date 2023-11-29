import { GET_MEMBERS, ADD_MEMBERS } from '../actions/member.action'

const initialState = []

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MEMBERS:
      return action.payload
    case ADD_MEMBERS:
      return [action.payload, ...state]
    default:
      return state
  }
}
