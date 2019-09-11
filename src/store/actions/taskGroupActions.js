export const taskListActionTypes = {
  DUE_DATE: 'DUE_DATE',
  PRIORITY: 'PRIORITY',
  USER: 'USER',
  TOGGLE_STATUS: 'TOGGLE_STATUS',
  TOGGLE_VIEW: 'TOGGLE_VIEW',
  DRAG_START: 'DRAG_START',
}
export const sortByDueDate = (type, id, order) => ({
  type,
  id,
  order
});
export const toggleStatus = (type, taskId, id, flag) => ({
  type,
  taskId,
  id,
  flag
});
export const toggleView = (type) => ({
  type,
});
export const setDraggingTaskId = (type, taskId, id) => ({
  type,
  taskId,
  id,
});