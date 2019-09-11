import { taskListActionTypes } from "../actions/taskGroupActions";
import { sortTasksByDate, sortTasksByPriority, sortTasksByUser } from "../../utilities/utility";
import { taskGroupData } from "../../assets/json/task";

const sortTaskListing = (taskGroupState, currentTaskId, sortingFunc, order) => {
  const _taskGroup = { ...taskGroupState[currentTaskId] };
  const _taskList = _taskGroup.taskList;
  const s = sortingFunc(_taskList, order);
  const n = [...taskGroupState];
  n.forEach(task => {
    if (task.id === currentTaskId) {
      task = s
    }
  })
  return n;
}

const _taskGroupState = {
  taskGroupData,
  currentFilter: '',
  order: false,
  view: false,
  taskGroupId: -1,
  taskListItemId: -1,
}

const taskGroupReducer = (taskGroupState = _taskGroupState, action) => {
  let sorted = {};
  // console.log(action);
  switch (action.type) {
    case taskListActionTypes.DUE_DATE:
      sorted = sortTaskListing(taskGroupState.taskGroupData, action.id, sortTasksByDate, action.order);
      return { ...taskGroupState, taskGroupData: sorted, currentFilter: action.type, order: action.order };
    case taskListActionTypes.PRIORITY:
      sorted = sortTaskListing(taskGroupState.taskGroupData, action.id, sortTasksByPriority, action.order);
      return { ...taskGroupState, taskGroupData: sorted, currentFilter: action.type, order: action.order };
    case taskListActionTypes.USER:
      sorted = sortTaskListing(taskGroupState.taskGroupData, action.id, sortTasksByUser, action.order);
      return { ...taskGroupState, taskGroupData: sorted, currentFilter: action.type, order: action.order };
    case taskListActionTypes.TOGGLE_STATUS:
      const t = [...taskGroupState.taskGroupData];
      const currentTaskGroup = t.filter(item => item.id === parseInt(action.taskId));
      const taskList = [...currentTaskGroup[0].taskList];
      // console.log(action, currentTaskGroup, taskList);
      taskList.forEach(item => {
        if (item.id === action.id) {
          item.status = action.flag;
        }
      });
      currentTaskGroup.taskList = taskList;
      t.forEach(item => {
        if (item.id === action.taskId) {
          item = currentTaskGroup;
        }
      });
      return { ...taskGroupState, taskGroupData: t, taskGroupId: -1, taskListItemId: -1 };
    case taskListActionTypes.TOGGLE_VIEW:
      return { ...taskGroupState, view: !taskGroupState.view };
    case taskListActionTypes.DRAG_START:
      // console.log(action.taskId, action.id);
      return { ...taskGroupState, taskGroupId: action.taskId, taskListItemId: action.id };
    default:
      return { ...taskGroupState };
  }
}

export default taskGroupReducer;