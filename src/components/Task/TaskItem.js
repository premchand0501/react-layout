import React from 'react';
import { getDateFormatted } from '../../utilities/utility';

const priorities = ["low", "med", "high"];

const TaskItem = ({ taskListItem, toggleTaskStatus, taskGroupData }) => (
  <li className="list-group-item rotated">
    <div className="col col-6 p-0">
      <label className="cb-container">
        <input type="checkbox" onChange={() => toggleTaskStatus(taskGroupData.id, taskListItem.id, !taskListItem.status)}
          checked={taskListItem.status} />
        <span className="checkmark">{taskListItem.status}</span>
      </label>
      <span>{taskListItem.subTaskName}</span>
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
          title={taskListItem.assignee && taskListItem.assignee.name ? taskListItem.assignee.name : ''} />
      </span>
    </div>
  </li>
)
export default TaskItem;