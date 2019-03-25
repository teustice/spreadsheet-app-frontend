export default function fetchReducer(state = {}, action) {
  switch (action.type) {
    case 'FETCH_DATA_REQUEST':
      // This time, you may want to display loader in the UI.
      return Object.assign({}, state, {
        isFetching: true
      });
    case 'FETCH_DATA_SUCCESS':
      // Adding derived todos to state
      return Object.assign({}, state, {
        isFetching: false,
        fetchData: action.fetchData
      });
    case 'FETCH_DATA_FAILURE':
      // Providing error message to state, to be able display it in UI.
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    default:
      return state;
  }
}
