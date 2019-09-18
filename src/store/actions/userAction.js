export const userActionTypes = {
  LOGIN: 'LOGIN',
}
export const setUserData = (loginStatus, userData) => ({
  type: userActionTypes.LOGIN, loginStatus, userData
})
export const saveUserData = (data) => {
  return dispatch => {
    dispatch(setUserData(true, data))
  }
}