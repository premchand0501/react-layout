import React from 'react';
import { Link } from 'react-router-dom';
import { getDateFormatted } from '../../utilities/utility';
import { connect } from 'react-redux';
import Draggable from '../UI/Draggable';
import { setDraggingTaskId } from '../../store/actions/taskListActions';

const TaskColumn = ({ taskListItem, handleDragStart }) => (
  <Draggable handleDragStart={() => handleDragStart(taskListItem._id, taskListItem.status, taskListItem.taskBoardId)}
    className="col col-12 text-dark text-decoration-none rotated mb-3"
    onDragOver={(e) => e.preventDefault()}>
    <Link to={`/task-details/${taskListItem._id}`} className="text-dark text-decoration-none">
      <div className="card">
        <div className="card-header bg-white">
          <div className="progress">
            <div className="progress-bar" role="progressbar" style={{ width: '25%' }}></div>
          </div>
        </div>
        <div className="card-body">
          <h6>{taskListItem.subTaskName}</h6>
        </div>
        <div className="card-footer bg-white">
          <div className="d-flex align-items-center justify-content-between">
            <span>
              <img src={taskListItem.assignee && taskListItem.assignee.profileImage !== '' ? taskListItem.assignee.profileImage :
                require('../../assets/img/user.png')} alt="profile img" className="img-fluid userIcon"
                title={taskListItem.assignee && taskListItem.assignee.assigneeName ? taskListItem.assignee.assigneeName : ''} />
            </span>
            <span>{
              (taskListItem.endDate && taskListItem.endDate !== '') ?
                getDateFormatted(taskListItem.startDate) + " - " + getDateFormatted(taskListItem.endDate) :
                getDateFormatted(taskListItem.startDate)
            }</span>
          </div>
        </div>
      </div>
    </Link>
  </Draggable>
)
const mapDispatchToProps = dispatch => ({
  handleDragStart: (id, status, taskBoardId) => {
    console.log(id, status, taskBoardId);
    dispatch(setDraggingTaskId({ id, status, taskBoardId }));
  }
})
export default connect(null, mapDispatchToProps)(TaskColumn);