import React from 'react';
import TaskItem from './TaskItem';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import TaskGridView from './TaskGridView';
import { taskListActionTypes, toggleTaskStatus } from '../../store/actions/taskListActions';

const TaskList = ({ taskListData, sortBy, currentFilter, order, view, toggleTaskStatus }) => (
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
        taskListData.map((taskListItem, index) => (
          <TaskItem taskListItem={taskListItem} key={index} taskListData={taskListData}
            toggleTaskStatus={toggleTaskStatus} />
        )) : (
          <TaskGridView taskListData={taskListData} dropEl={toggleTaskStatus} />
        )
    }
  </ul>
);
const mapStateToProps = (state) => ({
  view: state.taskListReducer.view,
});
const mapDispatchToProps = (dispatch) => ({
  toggleTaskStatus: (id, status) => {
    console.log(id, status);
    dispatch(toggleTaskStatus(id, status));
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);