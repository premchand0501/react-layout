import { fetchTaskGroupData, fetchTaskGroupDetails } from "../../utilities/service";

export const fetchTaskGroupActions = {
  START: 'TG_START',
  SUCCESS: 'TG_SUCCESS',
  ERROR: 'TG_ERROR',
  DETAILS: 'TG_DETAILS',
}

export const fetchTaskGroupBegins = () => ({
  type: fetchTaskGroupActions.START
})

export const fetchTaskGroupSuccess = (payload) => ({
  type: fetchTaskGroupActions.SUCCESS,
  payload
})

export const fetchTaskGroupError = (payload) => ({
  type: fetchTaskGroupActions.ERROR,
  payload
})
export const fetchTaskGroup = () => {
  return async dispatch => {
    dispatch(fetchTaskGroupBegins());
    try {
      const resData = await fetchTaskGroupData();
      resData.status === 1 ?
        dispatch(fetchTaskGroupSuccess(resData.data)) :
        dispatch(fetchTaskGroupError(resData))
    }
    catch (err) {
      dispatch(fetchTaskGroupError(err))
    }
  }
};

export const fetchTaskGroupDetailsAction = (payload) => ({
  type: fetchTaskGroupActions.DETAILS,
  payload
})
export const fetchTaskGroupDetailsBy = (id) => {
  return async dispatch => {
    const resData = await fetchTaskGroupDetails(id);
    resData.status === 1 ?
      dispatch(fetchTaskGroupDetailsAction(resData.data)) :
      dispatch(fetchTaskGroupError(resData));
  }
}