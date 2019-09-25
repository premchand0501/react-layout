import { fetchTaskDetailsData, fetchAttachedPictureData, uploadAttachedPictureData, removeAttachedPictureData, updateTaskDataFunc, createNewTask } from "../../utilities/service"

export const fetchTaskDetailsActions = {
  SUCCESS: 'TD_SUCCESS',
  ERROR: 'TD_ERROR',
  START: 'TD_START',
  EDITING_TASK: 'EDITING_TASK',
  TASK_UPDATED: 'TASK_UPDATED',
}
export const fetchTaskMediaActions = {
  SUCCESS: 'TM_SUCCESS',
  UPLOAD: 'TM_UPLOAD',
}
export const startUploadingMedia = (uploadMediaStatus) => ({
  type: fetchTaskMediaActions.UPLOAD,
  uploadMediaStatus
})
export const setEditingTask = (taskData) => ({
  type: fetchTaskDetailsActions.EDITING_TASK,
  taskData,
});
export const taskDetailsUpdated = (payload) => ({
  type: fetchTaskDetailsActions.TASK_UPDATED,
  payload,
});
export const fetchTaskDetailsBegins = () => ({
  type: fetchTaskDetailsActions.START
})

export const fetchTasDetailsSuccess = (payload) => ({
  type: fetchTaskDetailsActions.SUCCESS,
  payload
})

export const fetchTaskMediaSuccess = (payload) => ({
  type: fetchTaskMediaActions.SUCCESS,
  payload
})

export const fetchTaskDetailsError = (payload) => ({
  type: fetchTaskDetailsActions.ERROR,
  payload
})

export const fetchTaskDetails = (id) => {
  return async dispatch => {
    dispatch(fetchTaskDetailsBegins());
    try {
      const resData = await fetchTaskDetailsData(id);
      resData.status === 1 ?
        dispatch(fetchTasDetailsSuccess(resData.data)) :
        dispatch(fetchTaskDetailsError(resData))
    }
    catch (err) {
      dispatch(fetchTaskDetailsError(err))
    }
  }
}

export const updateTaskDetails = (data, action) => {
  return async dispatch => {
    dispatch(fetchTaskDetailsBegins());
    try {
      let resData = null;
      if (action === '1')
        resData = await updateTaskDataFunc(data);
      else
        resData = await createNewTask(data);
      if (resData.status === 1) {
        dispatch(taskDetailsUpdated(resData));
      }
      else {
        dispatch(fetchTaskDetailsError(resData));
      }
    }
    catch (err) {
      dispatch(fetchTaskDetailsError(err))
    }
  }
}
export const fetchAttachedPicture = (id) => {
  return async dispatch => {
    dispatch(fetchTaskDetailsBegins());
    try {
      const resData = await fetchAttachedPictureData(id);
      resData.status === 1 ?
        dispatch(fetchTaskMediaSuccess(resData.data)) :
        dispatch(fetchTaskDetailsError(resData))
    }
    catch (err) {
      dispatch(fetchTaskDetailsError(err))
    }
  }
}
export const uploadMediaForTask = (id, file) => {
  return async dispatch => {
    dispatch(fetchTaskDetailsBegins());
    try {
      const resData = await uploadAttachedPictureData(id, file);
      if (resData.status === 1) {
        dispatch(fetchAttachedPicture(id));
      }
      else {
        dispatch(fetchTaskDetailsError(resData))
      }
    }
    catch (err) {
      dispatch(fetchTaskDetailsError(err))
    }
  }
}
export const removeMediaForTask = (taskId, id) => {
  return async dispatch => {
    dispatch(fetchTaskDetailsBegins());
    try {
      const resData = await removeAttachedPictureData(id);
      if (resData.status === 1) {
        dispatch(fetchAttachedPicture(taskId));
      }
      else {
        dispatch(fetchTaskDetailsError(resData))
      }
    }
    catch (err) {
      dispatch(fetchTaskDetailsError(err))
    }
  }
}