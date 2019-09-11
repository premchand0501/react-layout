import React from 'react';
import TaskColumn from './TaskColumn';
import Droppable from '../UI/Droppable';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const TaskGridView = ({ taskGroupData, taskGroupId, taskListItemId, dropEl }) => (
  <div className="container-fluid p-3" style={{ border: '1px solid #ddd' }}>
    <div className="row">
      <div className="col col-6">
        <h4>In Progress</h4>
      </div>
      <div className="col col-6">
        <h4>Completed</h4>
      </div>
    </div>
    <div className="row">
      <div className="col col-6">
        <button className="btn btn-outline-dark w-100" title="Add new task">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className="col col-6">
        <button className="btn btn-outline-dark w-100" title="Add new completed task">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
    <div className="row">
      <Droppable className="col col-6" handleDrop={(e) => dropEl(taskGroupId, taskListItemId, false)}>
        <div className="row" onDragOver={(e) => e.preventDefault()}>
          {
            taskGroupData.taskList.filter(item => item.status === false).map((taskListItem, index) => (
              <TaskColumn taskListItem={taskListItem} key={index} taskGroupData={taskGroupData} />
            ))
          }
        </div>
      </Droppable>
      <Droppable className="col col-6" handleDrop={(e) => dropEl(taskGroupId, taskListItemId, true)}>
        <div className="row" onDragOver={(e) => e.preventDefault()}>
          {
            taskGroupData.taskList.filter(item => item.status === true).map((taskListItem, index) => (
              <TaskColumn taskListItem={taskListItem} key={index} taskGroupData={taskGroupData} />
            ))
          }
        </div>
      </Droppable>
    </div>
  </div>
)
const mapStateToProps = (state) => ({
  taskGroupId: state.taskGroupReducer.taskGroupId,
  taskListItemId: state.taskGroupReducer.taskListItemId,
})
export default connect(mapStateToProps, null)(TaskGridView);