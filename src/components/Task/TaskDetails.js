import React from 'react';
import { connect } from 'react-redux';
import { fetchTaskDetails } from '../../store/actions/taskDetailActions';
import { priorities } from '../../utilities/utility';

class TaskDetails extends React.Component {
  state = {
    editingInput: '',
    status: false
  }
  componentDidMount() {
    this.props.getTaskDetails(this.props.match.params.id);
  }
  render() {
    const { taskDetailsReducer, toggleTaskStatus } = this.props;
    const { taskDetails } = taskDetailsReducer;
    console.log(this.props);
    return (
      taskDetails ? (
        <div className="container mt-3 taskDetails">
          <div className="row">
            <div className="col col-8">
              <div className="card w-100">
                <div className="card-body">
                  <h2 className="text-capitalised mb-3">{taskDetails.subTaskName}</h2>
                  <p className="title-header">Description</p>
                  {
                    taskDetails.subTaskDesc ? (
                      <p>{taskDetails.subTaskDesc}</p>
                    ) :
                      <button className="btn btn-light w-100 text-left text-light border-0">Add a description</button>
                  }
                </div>
              </div>
            </div>
            <div className="col col-4">
              <div className="card w-100">
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col col-12">
                      <p className="title-header">Status</p>
                      <h6 className="m-0 d-flex align-items-center">
                        <label className="cb-container" title="Update status">
                          <input type="checkbox" onChange={() => toggleTaskStatus(taskDetails._id, !taskDetails.status)}
                            checked={taskDetails.status || this.state.status} />
                          <span className="checkmark"></span>
                        </label>
                        <span>{taskDetails.status ? 'Completed' : 'Pending'}</span>
                      </h6>
                    </div>
                  </div>
                  {
                    taskDetails.assignee ? (
                      <div className="row mb-3">
                        <div className="col col-12">
                          <p className="title-header">ASSIGNEE</p>
                          <h6>{taskDetails.assignee.assigneeName}</h6>
                        </div>
                      </div>
                    ) : null
                  }
                  {
                    taskDetails.reporter ? (
                      <div className="row mb-3">
                        <div className="col col-12">
                          <p className="title-header">Reporter</p>
                          <h6>{taskDetails.reporter.reporterName}</h6>
                        </div>
                      </div>
                    ) : null
                  }
                  {
                    taskDetails.priority ? (
                      <div className="row mb-3">
                        <div className="col col-12">
                          <p className="title-header">Priority</p>
                          <h6>
                            <span className={`badge ${taskDetails.priority === 0 ?
                              'badge-info' : (taskDetails.priority === 1) ? 'badge-warning' : 'badge-danger'} text-uppercase`}
                            >{priorities[taskDetails.priority]}</span>
                          </h6>
                        </div>
                      </div>
                    ) : null
                  }
                  <div className="row mb-3">
                    <div className="col col-12 text-light">
                      {
                        taskDetails.createdOn ? (
                          <p className="mb-1"><small>Created {taskDetails.createdOn}</small></p>
                        ) : null
                      }
                    </div>
                    <div className="col col-12 text-light">
                      {
                        taskDetails.createdOn ? (
                          <p className="mb-1"><small>Updated {taskDetails.updatedOn}</small></p>
                        ) : null
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null
    );
  }
}
const mapStateToProps = (state) => ({
  taskDetailsReducer: state.taskDetailsReducer,
})
const mapDispatchToProps = (dispatch) => ({
  getTaskDetails: (id) => {
    dispatch(fetchTaskDetails(id));
  },
  toggleTaskStatus: (id, status) => {

  }
})
export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails);