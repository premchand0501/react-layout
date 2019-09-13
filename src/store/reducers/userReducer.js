import { userActions } from "../actions/userAction";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case userActions.LOGIN:
      return action.userData;
    default: return {};
  }
}
export default userReducer;