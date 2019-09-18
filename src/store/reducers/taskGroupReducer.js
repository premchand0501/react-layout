import { fetchTaskGroupActions } from "../actions/taskGroupActions";
import { taskGroupData } from "../../assets/json/task";

const _taskGroupState = {
  taskGroupData,
  currentFilter: '',
  order: false,
  view: false,
  taskGroupId: -1,
  taskListItemId: -1,
}

const taskGroupReducer = (taskGroupState = _taskGroupState, action) => {
  switch (action.type) {
    case fetchTaskGroupActions.SUCCESS:
      return { ...taskGroupState, taskGroupData: action.payload };
    case fetchTaskGroupActions.DETAILS:
      return { taskGroupData: action.payload };
    default:
      return { ...taskGroupState };
  }
}

export default taskGroupReducer;