import React from 'react';
import { getDateFormatted } from '../../utilities/utility';
import { connect } from 'react-redux';
import Draggable from '../UI/Draggable';
import { setDraggingTaskId } from '../../store/actions/taskListActions';

const TaskColumn = ({ taskListItem, handleDragStart }) => (
  <Draggable handleDragStart={() => handleDragStart(taskListItem._id, taskListItem.status)}
    className="col col-12 text-dark text-decoration-none rotated mb-3"
    onDragOver={(e) => e.preventDefault()}>
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
  </Draggable>
)
const mapDispatchToProps = dispatch => ({
  handleDragStart: (id, status) => {
    console.log(id, status);
    dispatch(setDraggingTaskId({ id, status }));
  }
})
export default connect(null, mapDispatchToProps)(TaskColumn);