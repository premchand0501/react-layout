import React from 'react';
import TaskItem from './TaskItem';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { taskListActionTypes, toggleStatus } from '../../store/actions/taskGroupActions';
import { connect } from 'react-redux';
import TaskGridView from './TaskGridView';

const TaskList = ({ taskGroupData, sortBy, currentFilter, order, view, toggleTaskStatus, taskGroupId }) => (
  <ul className="list-group">

    <li className="list-group-item list-header">
      <div className="col col-6 p-0">
        <button className="btn btn-primary">Add Task</button>
      </div>
      <div className="col col-6 p-0">
        <button className={`btn btn-link text-light${currentFilter === taskListActionTypes.DUE_DATE ? ' active' : ''}`}
          onClick={() => sortBy(taskListActionTypes.DUE_DATE)}>Due
          {
            currentFilter === taskListActionTypes.DUE_DATE ? (
              <span style={{ transform: `rotate(${order ? 180 : 0}deg)` }} className="icon">
                <FontAwesomeIcon icon={faArrowDown} />
              </span>
            ) : ''
          }
        </button>
        <button className={`btn btn-link text-light${currentFilter === taskListActionTypes.PRIORITY ? ' active' : ''}`}
          onClick={() => sortBy(taskListActionTypes.PRIORITY)}>Priority
          {
            currentFilter === taskListActionTypes.PRIORITY ? (
              <span style={{ transform: `rotate(${order ? 180 : 0}deg)` }} className="icon">
                <FontAwesomeIcon icon={faArrowDown} />
              </span>
            ) : ''
          }
        </button>
        <button className={`btn btn-link text-light${currentFilter === taskListActionTypes.USER ? ' active' : ''}`}
          onClick={() => sortBy(taskListActionTypes.USER)}>
          <FontAwesomeIcon icon={faUser} />
          {
            currentFilter === taskListActionTypes.USER ? (
              <span style={{ transform: `rotate(${order ? 180 : 0}deg)` }} className="icon">
                <FontAwesomeIcon icon={faArrowDown} />
              </span>
            ) : ''
          }
        </button>
      </div>
    </li>
    {
      view ?
        taskGroupData[taskGroupId].taskList.map((taskListItem, index) => (
          <TaskItem taskListItem={taskListItem} key={index} taskGroupData={taskGroupData[taskGroupId]}
            toggleTaskStatus={toggleTaskStatus} />
        )) : (
          <TaskGridView taskGroupData={taskGroupData[taskGroupId]} dropEl={toggleTaskStatus} />
        )
    }
  </ul>
);
const mapStateToProps = (state) => ({
  view: state.taskGroupReducer.view,
  taskGroupData: state.taskGroupReducer.taskGroupData,
});
const mapDispatchToProps = (dispatch) => ({
  toggleTaskStatus: (taskGroupId, taskListItemId, status) => {
    // console.log(taskGroupId, taskListItemId, status);
    dispatch(toggleStatus(taskListActionTypes.TOGGLE_STATUS, taskGroupId, taskListItemId, status));
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);