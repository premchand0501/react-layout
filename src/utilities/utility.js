const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const getDateFormatted = (dataString) => {
  let date = new Date(dataString);
  let month = months[date.getMonth()];
  let day = date.getDate();
  // let year = date.getFullYear();
  return `${month} ${day}`;
}

export const sortTasksByDate = (_taskList, order) => {
  _taskList.forEach(task => {
    task.startTimestamp = new Date(task.startDate).getTime();
    task.endTimestamp = new Date(task.endDate).getTime();
  });
  const sortedByDueDate = _taskList.sort((a, b) => {
    return a.startTimestamp - b.endTimestamp
  });
  sortedByDueDate.forEach(task => {
    delete task.startTimestamp
    delete task.endTimestamp
  })
  return order ? _taskList.reverse() : _taskList;
}

export const sortTasksByPriority = (_taskList, order) => {
  const sortedByPriority = _taskList.sort((a, b) => {
    return a.priority - b.priority
  });
  return order ? sortedByPriority.reverse() : sortedByPriority;
}

export const sortTasksByUser = (_taskList, order) => {
  const sortedByPriority = _taskList.sort((a, b) => {
    return a.assignee.id - b.assignee.id
  });
  return order ? sortedByPriority.reverse() : sortedByPriority;
}