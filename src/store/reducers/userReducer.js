import { userActionTypes } from "../actions/userAction";

const initialState = {
  loginStatus: false,
  userData: null,
  allUsers: [],
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.LOGIN:
      console.log(action)
      if (action.userData && !action.userData.hasOwnProperty('_id')) {
        return { ...state };
      }
      localStorage.setItem('id', action.userData._id);
      return { ...state, loginStatus: action.loginStatus, userData: action.userData };
    case userActionTypes.SUCCESS:
      return { ...state, allUsers: action.payload }
    default: return { ...state };
  }
}
export default userReducer;