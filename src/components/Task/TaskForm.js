import React from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const TaskForm = ({ taskData, handleInputChange, allUsers, handleUserChange, handleSubmit, history, toggleTaskStatus }) => {
  const { subTaskName, subTaskDesc, status, startDate, endDate, priority, assigneeId } = taskData;
  return (
    <form className="card-body" onSubmit={(e) => handleSubmit(e)}>
      <h2>
        <button className="btn btn-outline-dark mr-3" onClick={() => history.go(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        Edit Task</h2>
      <hr />
      <div className="form-group">
        <span>Task Name</span>
        <input type="text" className="form-control" placeholder="Task Name" name="subTaskName"
          value={subTaskName} onChange={(e) => handleInputChange(e)} />
      </div>
      <div className="form-group">
        <span>Description</span>
        <input type="text" className="form-control" placeholder="Task Description" name="subTaskDesc"
          value={subTaskDesc} onChange={(e) => handleInputChange(e)} />
      </div>
      <h6 className="form-group d-flex align-items-center justify-content-between">
        <span>Task Status</span>
        <span className=" d-flex align-items-center justify-content-between">
          <label className="cb-container" title="Update status">
            <input type="checkbox" name="status" onChange={() => toggleTaskStatus(!status)}
              checked={status} />
            <span className="checkmark"></span>
          </label>
          <span>{status ? 'Completed' : 'Pending'}</span>
        </span>
      </h6>
      <div className="row">
        <div className="col col-6">
          <div className="form-group">
            <span>Start Date</span>
            <input type="datetime-local" className="form-control" placeholder="Start Date" name="startDate"
              value={startDate} onChange={(e) => handleInputChange(e)} required />
          </div>
        </div>
        <div className="col col-6">
          <div className="form-group">
            <span>End Date</span>
            <input type="datetime-local" className="form-control" placeholder="Start Date" name="endDate"
              value={endDate} onChange={(e) => handleInputChange(e)} required />
          </div>
        </div>
      </div>
      <div className="form-group">
        <span>Priority</span>
        <select name="priority" value={priority} className="form-control"
          onChange={(e) => handleInputChange(e)}>
          <option value="-1" disabled={priority < 0}>Select priority</option>
          <option value="0">Low</option>
          <option value="1">Medium</option>
          <option value="2">High</option>
        </select>
      </div>
      <div className="form-group">
        <span>Select Assignee</span>
        <select name="assigneeId" value={assigneeId} className="form-control"
          onChange={(e) => handleUserChange(e)}>
          <option value="" disabled={assigneeId === ''}>Select assignee</option>
          {
            allUsers && allUsers.map((user, index) => (
              <option value={user._id} key={index}>{user.name}</option>
            ))
          }
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}
export default withRouter(TaskForm);