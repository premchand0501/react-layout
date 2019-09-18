import { userActionTypes } from "../actions/userAction";

const initialState = {
  loginStatus: false,
  userData: {}
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.LOGIN:
      let { loginStatus, userData } = state;
      loginStatus = action.loginStatus;
      userData = action.userData;
      if (userData && !userData.hasOwnProperty('_id')) {
        return { ...state };
      }
      localStorage.setItem('id', userData._id);
      return { loginStatus, userData };
    default: return {};
  }
}
export default userReducer;