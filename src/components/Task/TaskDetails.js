import React from 'react';
import { connect } from 'react-redux';
import { fetchTaskDetails, uploadMediaForTask, fetchAttachedPicture, removeMediaForTask, startUploadingMedia, setEditingTask } from '../../store/actions/taskDetailActions';
import { priorities } from '../../utilities/utility';
import { baseUrl } from '../../utilities/service';
import { toggleTaskStatus } from '../../store/actions/taskListActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

class TaskDetails extends React.Component {
  state = {
    editingInput: '',
    status: false,
    uploadMedia: false,
    inputMediaUrl: '',
    inputMediaName: '',
    file: '',
    error: '',
    editTaskFlag: false,
  }
  componentDidMount() {
    this.props.getTaskDetails(this.props.match.params.id);
    this.props.getAttachedPictures(this.props.match.params.id);
  }
  handleFileChange(e) {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      let maxFileSize = 0;
      if (/image/.test(file.type)) {
        maxFileSize = 5;
      } else if (/video/.test(file.type)) {
        maxFileSize = 50;
      } else {
        this.setState({
          error: 'Only images and videos allowed'
        });
        return;
      }
      console.log(file);
      if (file.size / (1024 * 1024) <= maxFileSize) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          this.setState({
            inputMediaUrl: ev.target.result,
            inputMediaName: file.name,
            file: file,
            error: '',
          })
        }
        reader.readAsDataURL(file);
      }
      else {
        this.setState({
          error: 'Maximum file size exceeded'
        })
      }
    }
  }
  closeEditForm() {
    this.setState({
      editTaskFlag: false
    })
  }
  upload(e, id) {
    e.preventDefault();
    this.props.uploadMediaForTaskFunc(id, this.state.file);
  }
  render() {
    const { taskDetailsReducer, toggleTaskStatus, removeMediaForTaskFunc, uploadMedia, setEditingTaskFunc, history } = this.props;
    const { taskDetails, taskMedia, uploadMediaStatus } = taskDetailsReducer;
    return (
      taskDetails ? (
        <div className="container mt-3 mb-3 taskDetails">
          <div className="row">
            <div className="col col-8">
              <div className="card w-100">
                <div className="card-body">
                  <h2 className="text-capitalised mb-3">
                    <button className="btn btn-outline-dark mr-3" onClick={() => history.go(-1)}>
                      <FontAwesomeIcon icon={faArrowLeft} />&nbsp;Task List
                    </button>
                    <button className="btn btn-outline-dark btn-sm editBtn"
                      onClick={() => setEditingTaskFunc(taskDetails, history)}>
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </button>
                  </h2>
                  <h2 className="text-capitalised mb-3">
                    <span>
                      {taskDetails.subTaskName}
                    </span>
                  </h2>
                  <p className="title-header">Description</p>
                  {
                    taskDetails.subTaskDesc ? (
                      <p>{taskDetails.subTaskDesc}</p>
                    ) :
                      <button className="btn btn-light w-100 text-left text-light border-0">Add a description</button>
                  }
                  <div className="row mb-3">
                    <div className="col col-12">
                      <p className="title-header">Attached Pictures</p>
                      {
                        taskMedia && taskMedia.length > 0 ? (
                          <div className="row">
                            {
                              taskMedia.map((item, index) => (
                                <div className="col col-6 mb-3 picture" key={index}>
                                  <div className="imgWrapper" style={{
                                    backgroundImage: `url(${baseUrl}/${item.path})`
                                  }}>
                                    <p>{item.filename}</p>
                                    <button className="btn btn-danger deleteBtn"
                                      onClick={() => removeMediaForTaskFunc(taskDetails._id, item._id)}>&times;</button>
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                        ) : ''
                      }
                      <button className="btn btn-outline-dark"
                        onClick={() => uploadMedia(!uploadMediaStatus)}>Upload Pictures</button>
                    </div>
                  </div>
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
                    taskDetails.assignee != null ? (
                      <div className="row mb-3">
                        <div className="col col-12">
                          <p className="title-header">ASSIGNEE</p>
                          <h6>{taskDetails.assignee.assigneeName}</h6>
                        </div>
                      </div>
                    ) : null
                  }
                  {
                    taskDetails.reporter != null ? (
                      <div className="row mb-3">
                        <div className="col col-12">
                          <p className="title-header">Reporter</p>
                          <h6>{taskDetails.reporter.reporterName}</h6>
                        </div>
                      </div>
                    ) : null
                  }
                  {
                    taskDetails.priority != null ? (
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
                  <div className="row">
                    <div className="col col-12 text-light">
                      {
                        taskDetails.createdOn != null ? (
                          <p className="mb-1"><small>Created {
                            new Date(taskDetails.createdOn).toLocaleDateString() + ' ' +
                            new Date(taskDetails.createdOn).toLocaleTimeString()
                          }</small></p>
                        ) : null
                      }
                    </div>
                    <div className="col col-12 text-light">
                      {
                        taskDetails.updatedOn != null ? (
                          <p className="m-0"><small>Updated {
                            new Date(taskDetails.updatedOn).toLocaleDateString() + ' ' +
                            new Date(taskDetails.updatedOn).toLocaleTimeString()
                          }</small></p>
                        ) : null
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {
            uploadMediaStatus ? (
              <div className="uploadMediaForm">
                <form onSubmit={(e) => this.upload(e, taskDetails._id)}>
                  <h3>Upload Media for the task</h3>
                  <div className="input-group mb-3 mt-3">
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" accept="image/*"
                        id="inputGroupFile01" onChange={(e) => this.handleFileChange(e)} />
                      <label className="custom-file-label" htmlFor="inputGroupFile01">{
                        this.state.inputMediaName ? this.state.inputMediaName : 'Choose file'
                      }</label>
                    </div>
                  </div>
                  {
                    this.state.error !== '' ? (
                      <p className="text-danger">{this.state.error}</p>
                    ) : ''
                  }
                  {
                    this.state.inputMediaUrl ?
                      <img src={this.state.inputMediaUrl} alt={this.state.inputMediaName} className="img-fluid" />
                      : ''
                  }
                  <div className="input-group mt-3">
                    <button className="btn btn-primary" type="submit">Upload</button>
                    <button className="btn btn-link-danger" type="reset"
                      onClick={() => uploadMedia(!uploadMediaStatus)}>Close</button>
                  </div>
                </form>
              </div>
            ) :
              ""
          }
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
  getAttachedPictures: (id) => {
    dispatch(fetchAttachedPicture(id));
  },
  uploadMediaForTaskFunc: (id, file) => {
    dispatch(uploadMediaForTask(id, file));
  },
  removeMediaForTaskFunc: (taskId, id) => {
    dispatch(removeMediaForTask(taskId, id));
  },
  toggleTaskStatus: (id, status) => {
    dispatch(toggleTaskStatus(id, status));
  },
  uploadMedia: (flag) => {
    dispatch(startUploadingMedia(flag))
  },
  setEditingTaskFunc: (taskData, _history) => {
    dispatch(setEditingTask(taskData));
    _history.push(`/edit-task/1/${taskData._id}`);
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails);