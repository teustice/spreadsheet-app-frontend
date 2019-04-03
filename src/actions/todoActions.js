import apiUrl from '../lib/apiUrl';

export function getTodos(callback) {
  return function(dispatch) {
    dispatch({
      type: 'GET_TODOS_REQUEST'
    });
    return fetch(`${apiUrl}/todos`)
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'GET_TODOS_FAILURE',
            error: body.error
          });
        } else {
          dispatch({
            type: 'GET_TODOS_SUCCESS',
            data: body
          });

          callback && callback();

        }
      })
  }
}

export function createTodo(body, callback) {
  return function(dispatch) {
    dispatch({
      type: 'CREATE_TODOS_REQUEST'
    });
    return fetch(`${apiUrl}/todos`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'CREATE_TODOS_FAILURE',
            error: body.error
          });
        } else {
          dispatch({
            type: 'CREATE_TODOS_SUCCESS',
            data: body
          });
          callback && callback();
          dispatch(getTodos());
        }
      });
  }
}

export function createTodoBatch(body, callback) {
  return function(dispatch) {
    dispatch({
      type: 'CREATE_TODOS_BATCH_REQUEST'
    });
    return fetch(`${apiUrl}/todos/batch`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'CREATE_TODOS_BATCH_FAILURE',
            error: body.error
          });
          callback && callback('Error');
        } else {
          dispatch({
            type: 'CREATE_TODOS_BATCH_SUCCESS',
            data: body
          });
          dispatch(getTodos());
          callback && callback();
        }
      });
  }
}

export function updateTodo(body, id, callback) {
  return function(dispatch) {
    dispatch({
      type: 'UPDATE_TODOS_REQUEST'
    });
    return fetch(`${apiUrl}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'UPDATE_TODOS_FAILURE',
            error: body.error
          });
        } else {
          dispatch({
            type: 'UPDATE_TODOS_SUCCESS',
            data: body
          });
          callback && callback();
          dispatch(getTodos());
        }
      });
  }
}

export function deleteTodo(id, callback) {
  return function(dispatch) {
    dispatch({
      type: 'DELETE_TODOS_REQUEST'
    });
    return fetch(`${apiUrl}/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'DELETE_TODOS_FAILURE',
            error: body.error
          });
        } else {
          dispatch({
            type: 'DELETE_TODOS_SUCCESS',
            data: body
          });
          callback && callback();
          dispatch(getTodos());
        }
      });
  }
}

export function deleteTodoBatch(idArray, callback) {
  return function(dispatch) {
    dispatch({
      type: 'DELETE_TODOS_BATCH_REQUEST'
    });
    return fetch(`${apiUrl}/todos/batch-delete`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(idArray)
    })
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'DELETE_TODOS_BATCH_FAILURE',
            error: body.error
          });
        } else {
          dispatch({
            type: 'DELETE_TODOS_BATCH_SUCCESS',
            data: body
          });
          callback && callback()
          dispatch(getTodos());
        }
      });
  }
}
