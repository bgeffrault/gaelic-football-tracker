import supabase from '../config/supabaseClient'

export const GET_MEMBERS = 'GET_MEMBERS'
export const ADD_MEMBERS = 'ADD_MEMBERS'

export const getMembers = () => {
  return async (dispatch) => {
    const { data: members } = await supabase.from('Members').select('*, Shoots(*)')
    dispatch({ type: GET_MEMBERS, payload: members })
    return members
  }
}
export const addMembers = (data) => {
  return async (dispatch) => {
    await supabase.from('Members').insert(data)
    dispatch({ type: ADD_MEMBERS, payload: data })
  }
}
