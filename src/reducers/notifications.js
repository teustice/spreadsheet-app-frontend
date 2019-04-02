export default (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    default:
      return state;
  }
}
