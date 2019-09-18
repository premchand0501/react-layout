import { fetchTaskListData, toggleTaskStatusFunc } from "../../utilities/service";

export const taskListActionTypes = {
  DUE_DATE: 'DUE_DATE',
  PRIORITY: 'PRIORITY',
  USER: 'USER',
  TOGGLE_STATUS: 'TOGGLE_STATUS',
  TOGGLE_VIEW: 'TOGGLE_VIEW',
  DRAG_START: 'DRAG_START',
}
export const sortTaskListBy = (type, id, order) => ({
  type,
  id,
  order
});
export const toggleStatus = (taskId, id, flag) => ({
  type: taskListActionTypes.TOGGLE_STATUS,
  taskId,
  id,
  flag
});
export const toggleView = () => ({
  type: taskListActionTypes.TOGGLE_VIEW,
});
export const setDraggingTaskId = (task) => ({
  type: taskListActionTypes.DRAG_START,
  task,
});

export const fetchTaskListActions = {
  START: 'TL_START',
  SUCCESS: 'TL_SUCCESS',
  ERROR: 'TL_ERROR',
}
export const fetchTaskListBegins = () => ({
  type: fetchTaskListActions.START
})

export const fetchTaskListSuccess = (payload) => ({
  type: fetchTaskListActions.SUCCESS,
  payload
})

export const fetchTaskListError = (payload) => ({
  type: fetchTaskListActions.ERROR,
  payload
})

export const fetchTaskList = (id) => {
  return async dispatch => {
    dispatch(fetchTaskListBegins());
    try {
      const resData = await fetchTaskListData(id);
      resData.status === 1 ?
        dispatch(fetchTaskListSuccess(resData.data)) :
        dispatch(fetchTaskListError(resData))
    }
    catch (err) {
      dispatch(fetchTaskListError(err))
    }
  }
}

export const toggleTaskStatus = (id, flag) => {
  return async dispatch => {
    dispatch(fetchTaskListBegins());
    try {
      const resData = await toggleTaskStatusFunc(id, flag);
      await resData.status === 1 ?
        dispatch(fetchTaskListSuccess(resData.data)) :
        dispatch(fetchTaskListError(resData))
    }
    catch (err) {
      dispatch(fetchTaskListError(err))
    }
  }
}