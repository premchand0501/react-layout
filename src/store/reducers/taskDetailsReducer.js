import { fetchTaskDetailsActions } from "../actions/taskDetailActions";

const _taskDetailState = {
  taskDetails: {},
  status: false,
}

const taskDetailsReducer = (taskDetailState = _taskDetailState, action) => {
  switch (action.type) {
    case fetchTaskDetailsActions.SUCCESS:
      return { taskDetails: action.payload, status: action.status };
    default:
      return { ...taskDetailState };
  }
}

export default taskDetailsReducer;