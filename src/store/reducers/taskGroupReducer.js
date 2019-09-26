import { fetchTaskGroupActions } from "../actions/taskGroupActions";

const _taskGroupState = {
  taskGroupData: [],
  currentFilter: '',
  order: false,
  view: false,
  taskGroupId: -1,
  taskListItemId: -1,
  createNewTaskBoard: null,
}

const taskGroupReducer = (taskGroupState = _taskGroupState, action) => {
  switch (action.type) {
    case fetchTaskGroupActions.SUCCESS:
      return { ...taskGroupState, taskGroupData: action.payload };
    case fetchTaskGroupActions.DETAILS:
      return { ...taskGroupState, taskGroupData: action.payload };
    case fetchTaskGroupActions.CREATE_NEW_TASK:
      return { ...taskGroupState, createNewTaskBoard: action.payload };
    case fetchTaskGroupActions.NULL_CREATE_NEW_TASK:
      return { ...taskGroupState, createNewTaskBoard: null };
    default:
      return { ...taskGroupState };
  }
}

export default taskGroupReducer;