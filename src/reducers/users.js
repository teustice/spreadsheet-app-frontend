export function users(state = [], action) {
  switch (action.type) {
    case 'GET_USERS_REQUEST':
      return Object.assign({}, state, {
        isFetching: true
      });
    case 'GET_USERS_SUCCESS':
      return {data: action.data};
    case 'GET_USERS_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    default:
      return state;
  }
}
//
// export function deleteTodo(state = [], action) {
//   switch (action.type) {
//     case 'DELETE_TODOS_REQUEST':
//       return Object.assign({}, state, {
//         isFetching: true
//       });
//     case 'DELETE_TODOS_SUCCESS':
//       return {data: action.data};
//     case 'DELETE_TODOS_FAILURE':
//       return Object.assign({}, state, {
//         isFetching: false,
//         error: action.error
//       });
//     default:
//       return state;
//   }
// }
//
// export function createTodo(state = [], action) {
//   switch (action.type) {
//     case 'CREATE_TODOS_REQUEST':
//       return Object.assign({}, state, {
//         isFetching: true
//       });
//     case 'CREATE_TODOS_SUCCESS':
//       return {data: action.data};
//     case 'CREATE_TODOS_FAILURE':
//       return Object.assign({}, state, {
//         isFetching: false,
//         error: action.error
//       });
//     default:
//       return state;
//   }
// }
//
// export function updateTodo(state = [], action) {
//   switch (action.type) {
//     case 'UPDATE_TODOS_REQUEST':
//       return Object.assign({}, state, {
//         isFetching: true
//       });
//     case 'UPDATE_TODOS_SUCCESS':
//       return {data: action.data};
//     case 'UPDATE_TODOS_FAILURE':
//       return Object.assign({}, state, {
//         isFetching: false,
//         error: action.error
//       });
//     default:
//       return state;
//   }
// }
