import { fetchTaskListActions, taskListActionTypes } from "../actions/taskListActions";

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

const _taskListState = {
  taskListData: [],
  currentFilter: '',
  order: false,
  view: localStorage.getItem('view') && localStorage.getItem('view') !== '' ? localStorage.getItem('view') === 'true' : false,
  taskGroupId: -1,
  draggingTask: {
    id: -1,
    status: false,
    taskBoardId: '',
  },
}

const taskListReducer = (taskListState = _taskListState, action) => {
  const { taskListData } = taskListState;
  let sorted = [];
  switch (action.type) {
    case fetchTaskListActions.SUCCESS:
      return { ...taskListState, taskListData: action.payload };
    case taskListActionTypes.DUE_DATE:
      sorted = taskListData.sort((prev, curr) => new Date(prev.startDate).getTime() - new Date(curr.startDate).getTime());
      return { ...taskListState, td: action.order ? sorted : sorted.reverse(), currentFilter: action.type, order: !action.order };
    case taskListActionTypes.PRIORITY:
      sorted = taskListData.sort((prev, curr) => prev.priority - curr.priority);
      return { ...taskListState, taskListData: action.order ? sorted : sorted.reverse(), currentFilter: action.type, order: !action.order };
    case taskListActionTypes.USER:
      sorted = taskListData.sort((prev, curr) => prev.assignee.assigneeName - curr.assignee.assigneeName);
      return { ...taskListState, taskListData: action.order ? sorted : sorted.reverse(), currentFilter: action.type, order: !action.order };
    case taskListActionTypes.TOGGLE_VIEW:
      localStorage.setItem('view', !taskListState.view);
      return { ...taskListState, view: !taskListState.view }
    case taskListActionTypes.DRAG_START:
      return { ...taskListState, draggingTask: action.task }
    default:
      return { ...taskListState };
  }
}

export default taskListReducer;