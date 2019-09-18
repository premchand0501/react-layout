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
  },
}

const taskListReducer = (taskListState = _taskListState, action) => {
  switch (action.type) {
    case fetchTaskListActions.SUCCESS:
      return { ...taskListState, taskListData: action.payload };
    case taskListActionTypes.DUE_DATE:
    case taskListActionTypes.PRIORITY:
    case taskListActionTypes.USER:
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