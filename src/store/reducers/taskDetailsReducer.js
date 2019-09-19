import { fetchTaskDetailsActions, fetchTaskMediaActions } from "../actions/taskDetailActions";

const _taskDetailState = {
  taskDetails: {},
  taskMedia: {},
  status: false,
  uploadMediaStatus: false,
}

const taskDetailsReducer = (taskDetailState = _taskDetailState, action) => {
  console.log(action);
  switch (action.type) {
    case fetchTaskDetailsActions.SUCCESS:
      return { ...taskDetailState, taskDetails: action.payload };
    case fetchTaskMediaActions.SUCCESS:
      return { ...taskDetailState, taskMedia: action.payload, uploadMediaStatus: false };
    case fetchTaskMediaActions.UPLOAD:
      return { ...taskDetailState, uploadMediaStatus: action.uploadMediaStatus };
    default:
      return { ...taskDetailState };
  }
}

export default taskDetailsReducer;