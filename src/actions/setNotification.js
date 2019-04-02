export const setNotification = (data) => dispatch => {
  dispatch({
    type: 'SET_NOTIFICATION',
    payload: data
  })
}
