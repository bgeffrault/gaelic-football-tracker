import { combineReducers } from 'redux'
import memberReducer from './memberReducer'
import shootReducer from './shootReducer'

export default combineReducers({
  memberReducer,
  shootReducer,
})
