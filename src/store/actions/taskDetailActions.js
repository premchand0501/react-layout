import { fetchTaskDetailsData, fetchAttachedPictureData, uploadAttachedPictureData, removeAttachedPictureData } from "../../utilities/service"
import { fetchTaskListActions } from "./taskListActions"

export const fetchTaskDetailsActions = {
  SUCCESS: 'TD_SUCCESS',
}
export const fetchTaskMediaActions = {
  SUCCESS: 'TM_SUCCESS',
  UPLOAD: 'TM_UPLOAD',
}
export const startUploadingMedia = (uploadMediaStatus) => ({
  type: fetchTaskMediaActions.UPLOAD,
  uploadMediaStatus
})
export const fetchTaskListBegins = () => ({
  type: fetchTaskListActions.START
})

export const fetchTaskListSuccess = (payload) => ({
  type: fetchTaskDetailsActions.SUCCESS,
  payload
})

export const fetchTaskMediaSuccess = (payload) => ({
  type: fetchTaskMediaActions.SUCCESS,
  payload
})

export const fetchTaskListError = (payload) => ({
  type: fetchTaskListActions.ERROR,
  payload
})

export const fetchTaskDetails = (id) => {
  return async dispatch => {
    dispatch(fetchTaskListBegins());
    try {
      const resData = await fetchTaskDetailsData(id);
      resData.status === 1 ?
        dispatch(fetchTaskListSuccess(resData.data)) :
        dispatch(fetchTaskListError(resData))
    }
    catch (err) {
      dispatch(fetchTaskListError(err))
    }
  }
}
export const fetchAttachedPicture = (id) => {
  return async dispatch => {
    dispatch(fetchTaskListBegins());
    try {
      const resData = await fetchAttachedPictureData(id);
      resData.status === 1 ?
        dispatch(fetchTaskMediaSuccess(resData.data)) :
        dispatch(fetchTaskListError(resData))
    }
    catch (err) {
      dispatch(fetchTaskListError(err))
    }
  }
}
export const uploadMediaForTask = (id, file) => {
  return async dispatch => {
    dispatch(fetchTaskListBegins());
    try {
      const resData = await uploadAttachedPictureData(id, file);
      if (resData.status === 1) {
        dispatch(fetchAttachedPicture(id));
      }
      else {
        dispatch(fetchTaskListError(resData))
      }
    }
    catch (err) {
      dispatch(fetchTaskListError(err))
    }
  }
}
export const removeMediaForTask = (taskId, id) => {
  return async dispatch => {
    dispatch(fetchTaskListBegins());
    try {
      const resData = await removeAttachedPictureData(id);
      if (resData.status === 1) {
        dispatch(fetchAttachedPicture(taskId));
      }
      else {
        dispatch(fetchTaskListError(resData))
      }
    }
    catch (err) {
      dispatch(fetchTaskListError(err))
    }
  }
}