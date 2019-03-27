import apiUrl from '../lib/apiUrl';

export function getUsers(token) {
  return function(dispatch) {
    dispatch({
      type: 'GET_USERS_REQUEST'
    });
    return fetch(`${apiUrl}/users`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
    .then(response => response.json().then(body => ({ response, body })))
    .then(({ response, body }) => {
      if (!response.ok) {
        dispatch({
          type: 'GET_USERS_FAILURE',
          error: body.error
        });
      } else {
        dispatch({
          type: 'GET_USERS_SUCCESS',
          data: body
        });
      }
    });
  }
}
//
// export function createTodo(body) {
//   return function(dispatch) {
//     dispatch({
//       type: 'CREATE_TODOS_REQUEST'
//     });
//     return fetch(`${apiUrl}/todos`, {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(body)
//     })
//       .then(response => response.json().then(body => ({ response, body })))
//       .then(({ response, body }) => {
//         if (!response.ok) {
//           dispatch({
//             type: 'CREATE_TODOS_FAILURE',
//             error: body.error
//           });
//         } else {
//           dispatch({
//             type: 'CREATE_TODOS_SUCCESS',
//             data: body
//           });
//           dispatch(getTodos());
//         }
//       });
//   }
// }
//
// export function updateTodo(body, id) {
//   return function(dispatch) {
//     dispatch({
//       type: 'UPDATE_TODOS_REQUEST'
//     });
//     return fetch(`${apiUrl}/todos/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(body)
//     })
//       .then(response => response.json().then(body => ({ response, body })))
//       .then(({ response, body }) => {
//         if (!response.ok) {
//           dispatch({
//             type: 'UPDATE_TODOS_FAILURE',
//             error: body.error
//           });
//         } else {
//           dispatch({
//             type: 'UPDATE_TODOS_SUCCESS',
//             data: body
//           });
//           dispatch(getTodos());
//         }
//       });
//   }
// }
//
// export function deleteTodo(id) {
//   return function(dispatch) {
//     dispatch({
//       type: 'DELETE_TODOS_REQUEST'
//     });
//     return fetch(`${apiUrl}/todos/${id}`, {
//       method: 'DELETE',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       }
//     })
//       .then(response => response.json().then(body => ({ response, body })))
//       .then(({ response, body }) => {
//         if (!response.ok) {
//           dispatch({
//             type: 'DELETE_TODOS_FAILURE',
//             error: body.error
//           });
//         } else {
//           dispatch({
//             type: 'DELETE_TODOS_SUCCESS',
//             data: body
//           });
//           dispatch(getTodos());
//         }
//       });
//   }
// }
