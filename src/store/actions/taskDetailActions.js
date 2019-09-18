import { fetchTaskDetailsData } from "../../utilities/service"
import { fetchTaskListActions } from "./taskListActions"

export const fetchTaskDetailsActions = {
  SUCCESS: 'TD_SUCCESS',
}
export const fetchTaskListBegins = () => ({
  type: fetchTaskListActions.START
})

export const fetchTaskListSuccess = (payload) => ({
  type: fetchTaskDetailsActions.SUCCESS,
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