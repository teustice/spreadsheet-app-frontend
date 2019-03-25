export default (state = {}, action) => {
  switch (action.type) {
    case 'SIMPLE_ACTION':
      return {
        newText: action.payload
      }
    default:
      return state;
  }
}
