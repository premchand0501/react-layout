import React from 'react';
import { Link } from 'react-router-dom';
import { getDateFormatted, priorities } from '../../utilities/utility';

const TaskItem = ({ taskListItem, toggleTaskStatus }) => (
  <li className="list-group-item rotated">
    <div className="col col-6 p-0">
      <label className="cb-container">
        <input type="checkbox" onChange={() => toggleTaskStatus(taskListItem._id, !taskListItem.status, taskListItem.taskBoardId)}
          checked={taskListItem.status} />
        <span className="checkmark">{taskListItem.status}</span>
      </label>
      <Link to={`/task-details/${taskListItem._id}`} className="text-dark">{taskListItem.subTaskName}</Link>
    </div>
    <div className="col col-6 p-0">
      <span>{
        (taskListItem.endDate && taskListItem.endDate !== '') ?
          getDateFormatted(taskListItem.startDate) + " - " + getDateFormatted(taskListItem.endDate) :
          getDateFormatted(taskListItem.startDate)
      }</span>
      <span>
        <span className={`badge ${taskListItem.priority === 0 ?
          'badge-info' : (taskListItem.priority === 1) ? 'badge-warning' : 'badge-danger'}`}
        >{priorities[taskListItem.priority]}</span>
      </span>
      <span>
        <img src={taskListItem.assignee && taskListItem.assignee.profileImage !== '' ? taskListItem.assignee.profileImage :
          require('../../assets/img/user.png')} alt="profile img" className="img-fluid userIcon"
          title={taskListItem.assignee && taskListItem.assignee.assigneeName ? taskListItem.assignee.assigneeName : ''} />
      </span>
    </div>
  </li>
)
export default TaskItem;