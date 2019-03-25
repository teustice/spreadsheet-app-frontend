export const updateText = (text) => dispatch => {
  dispatch({
    type: 'UPDATE_TEXT',
    text
  })
}
