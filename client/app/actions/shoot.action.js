import supabase from '../config/supabaseClient'

export const GET_SHOOT = 'GET_SHOOT'
export const ADD_SHOOT = 'ADD_SHOOT'

export const getShoot = () => {
  return async (dispatch) => {
    const { data: shoots } = await supabase.from('Shoots').select('*')
    dispatch({
      type: GET_SHOOT,
      payload: shoots.filter((e) => e.teamGameId),
    })
  }
}
export const addShoot = (data) => {
  return async (dispatch) => {
    await supabase.from('Shoots').insert(data)
    dispatch({ type: ADD_SHOOT, payload: data })
  }
}
