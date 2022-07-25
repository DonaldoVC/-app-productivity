import axios from "axios";

import {LOADING} from "@constants/loader.contants";

import {
  DELETE_TASK,
  DELETE_TASK_ERROR,
  GET_TASKS,
  GET_TASKS_ERROR,
  MODIFY_TASK,
  MODIFY_TASK_ERROR,
  SAVE_TASK,
  SAVE_TASK_ERROR
} from "@constants/services/task.service.contant";

/**
 * Create a task in a section.
 *
 * @param task Task object
 */
export const saveTask = (task: NewTaskForm) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: LOADING, loading: true });

      const response = await axios.post(`${process.env.REACT_APP_API}/task`, { data: task });

      dispatch({
        type: SAVE_TASK,
        task: response.data,
        status: response.status
      });
    } catch (e) {
      dispatch({
        type: SAVE_TASK_ERROR,
        error: e,
        status: 500
      });

      dispatch({ type: LOADING, loading: false });
    }
  }
}

/**
 * Create init task
 */
export const graph = () => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: LOADING, loading: true });

      await axios.post(`${process.env.REACT_APP_API}/task/graph`, {});
      const response = await axios.get(`${process.env.REACT_APP_API}/task`);

      dispatch({
        type: GET_TASKS,
        all_tasks: response.data,
        status: response.status
      });

      dispatch({ type: LOADING, loading: false });
    } catch (e) {
      dispatch({
        type: GET_TASKS_ERROR,
        error: e,
        status: 500
      });

      dispatch({ type: LOADING, loading: false });
    }
  }
}

/**
 * Get all created tasks.
 */
export const getTasks = () => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: LOADING, loading: true });

      const response = await axios.get(`${process.env.REACT_APP_API}/task`);

      dispatch({
        type: GET_TASKS,
        all_tasks: response.data,
        status: response.status
      });

      dispatch({ type: LOADING, loading: false });
    } catch (e) {
      dispatch({
        type: GET_TASKS_ERROR,
        error: e,
        status: 500
      });

      dispatch({ type: LOADING, loading: false });
    }
  }
}

/**
 * Update task values
 *
 * @param task Task object
 */
export const modifyTask = (task: ModifyTaskForm) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: LOADING, loading: true });

      const response = await axios.put(`${process.env.REACT_APP_API}/task/${task._id}`, {data: task});

      dispatch({
        type: MODIFY_TASK,
        task: response.data,
        status: response.status
      });

      dispatch({ type: LOADING, loading: false });
    } catch (e) {
      dispatch({
        type: MODIFY_TASK_ERROR,
        error: e,
        status: 500
      });

      dispatch({ type: LOADING, loading: false });
    }
  }
}

/**
 * Change the status of a
 *
 * @param task
 */
export const changeStatus = (task: ModifyTaskForm) => {
  return async (dispatch: any) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API}/task/change/${task._id}`, {data: task});

      dispatch({
        type: MODIFY_TASK,
        task: response.data,
        status: response.status
      });
    } catch (e) {
      dispatch({
        type: MODIFY_TASK_ERROR,
        error: e,
        status: 500
      });
    }
  }
}


export const reset = (id: string) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: LOADING, loading: true });

      const response = await axios.put(`${process.env.REACT_APP_API}/task/reset/${id}`, {});

      dispatch({
        type: MODIFY_TASK,
        task: response.data,
        status: response.status
      });

      dispatch({ type: LOADING, loading: false });
    } catch (e) {
      dispatch({
        type: MODIFY_TASK_ERROR,
        error: e,
        status: 500
      });

      dispatch({ type: LOADING, loading: false });
    }
  }
}

export const deleteTask = (id: string) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: LOADING, loading: true });

      const response = await axios.delete(`${process.env.REACT_APP_API}/task/${id}`);

      dispatch({
        type: DELETE_TASK,
        task: response.data,
        status: response.status
      });

      dispatch({ type: LOADING, loading: false });
    } catch (e) {
      dispatch({
        type: DELETE_TASK_ERROR,
        error: e,
        status: 500
      });

      dispatch({ type: LOADING, loading: false });
    }
  }
}

// Guardado de nuevo orden de tarea según usuario.
export const order = (task: Task[]) => {
  return async (dispatch: any) => {
    try {
      await axios.post(`${process.env.REACT_APP_API}/task/order`, {data: {task}});
      const response = await axios.get(`${process.env.REACT_APP_API}/task`);

      dispatch({
        type: GET_TASKS,
        all_tasks: response.data,
        status: response.status
      });
    } catch (e) {
      dispatch({
        type: MODIFY_TASK_ERROR,
        error: e,
        status: 500
      });
    }
  }
}


