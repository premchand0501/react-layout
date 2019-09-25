import { fetchTaskDetailsActions, fetchTaskMediaActions } from "../actions/taskDetailActions";

const _taskDetailState = {
  taskDetails: {},
  taskMedia: {},
  status: false,
  uploadMediaStatus: false,
  editingTask: null,
  taskUpdateRes: {
    status: -1,
    msg: '',
    data: null,
  },
}

const taskDetailsReducer = (taskDetailState = _taskDetailState, action) => {
  switch (action.type) {
    case fetchTaskDetailsActions.SUCCESS:
      return { ...taskDetailState, taskDetails: action.payload, editingTask: null, taskUpdateRes: null };
    case fetchTaskDetailsActions.EDITING_TASK:
      return { ...taskDetailState, editingTask: action.taskData };
    case fetchTaskMediaActions.SUCCESS:
      return { ...taskDetailState, taskMedia: action.payload, uploadMediaStatus: false };
    case fetchTaskMediaActions.UPLOAD:
      return { ...taskDetailState, uploadMediaStatus: action.uploadMediaStatus };
    case fetchTaskDetailsActions.TASK_UPDATED:
      return { ...taskDetailState, editingTask: null, taskUpdateRes: action.payload };
    case fetchTaskDetailsActions.ERROR:
      return { ...taskDetailState, editingTask: null, taskUpdateRes: { status: 0, msg: '', data: null } };
    default:
      return { ...taskDetailState };
  }
}

export default taskDetailsReducer;