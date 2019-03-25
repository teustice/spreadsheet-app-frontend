export default (state = 'Hello World', action) => {
  switch (action.type) {
    case 'UPDATE_TEXT':
      return action.text
    default:
      return state;
  }
}
