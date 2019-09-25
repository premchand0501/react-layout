import { fetchAllUsers } from "../../utilities/service";

export const userActionTypes = {
  LOGIN: 'LOGIN',
  START: 'START',
  ERROR: 'ERROR',
  SUCCESS: 'USER_SUCCESS',
}
export const setUserData = (loginStatus, userData) => ({
  type: userActionTypes.LOGIN, loginStatus, userData
});
export const fetchAllUsersActionBegins = () => ({
  type: userActionTypes.START,
});
export const fetchAllUsersActionSuccess = (payload) => ({
  type: userActionTypes.SUCCESS,
  payload,
});
export const fetchAllUsersActionError = (payload) => ({
  type: userActionTypes.ERROR,
  payload,
});
export const saveUserData = (data) => {
  return dispatch => {
    dispatch(setUserData(true, data))
  }
}

export const getAllUsers = () => {
  return async dispatch => {
    dispatch(fetchAllUsersActionBegins());
    const usersRes = await fetchAllUsers();
    try {
      usersRes && usersRes.status === 1 ?
        dispatch(fetchAllUsersActionSuccess(usersRes.data)) :
        dispatch(fetchAllUsersActionError(usersRes));
    }
    catch (e) {
      dispatch(fetchAllUsersActionError(e));
    }
  }
}