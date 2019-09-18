import React from 'react';
import TaskColumn from './TaskColumn';
import Droppable from '../UI/Droppable';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const TaskGridView = ({ taskListData, draggingTask, dropEl }) => (
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
      <Droppable className="col col-6" handleDrop={() => dropEl(draggingTask.id, !draggingTask.status)}>
        <div className="row" onDragOver={(e) => e.preventDefault()}>
          {
            taskListData.filter(item => item.status === false).map((taskListItem, index) => (
              <TaskColumn taskListItem={taskListItem} key={index} taskGroupData={taskListData} />
            ))
          }
        </div>
      </Droppable>
      <Droppable className="col col-6" handleDrop={() => dropEl(draggingTask.id, !draggingTask.status)}>
        <div className="row" onDragOver={(e) => e.preventDefault()}>
          {
            taskListData.filter(item => item.status === true).map((taskListItem, index) => (
              <TaskColumn taskListItem={taskListItem} key={index} taskGroupData={taskListData} />
            ))
          }
        </div>
      </Droppable>
    </div>
  </div>
)
const mapStateToProps = (state) => ({
  // taskGroupId: state.taskGroupReducer.taskGroupId,
  draggingTask: state.taskListReducer.draggingTask,
})
export default connect(mapStateToProps, null)(TaskGridView);