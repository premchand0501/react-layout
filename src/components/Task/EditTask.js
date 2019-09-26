import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllUsers } from '../../store/actions/userAction';
import { updateTaskDetails, fetchTasDetailsSuccess } from '../../store/actions/taskDetailActions';
import TaskForm from './TaskForm';

class EditTask extends React.Component {
  state = {
    _id: '',
    subTaskName: '',
    subTaskDesc: '',
    status: false,
    startDate: '',
    endDate: '',
    priority: -1,
    assignee: null,
    assigneeId: '',
    taskBoardId: -1,
  }
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleUserChange(e) {
    const { allUsers } = this.props;
    const name = e.target.name;
    const value = e.target.value;
    const assignee = allUsers.filter(user => user._id === value)[0];
    console.log(assignee);
    this.setState({
      [name]: value,
      assignee: {
        assigneeId: assignee._id,
        assigneeName: assignee.name,
        profileImage: assignee.profileImage,
      }
    })
  }
  extractData(editingTask, action) {
    if (action === '1') {
      let { _id, subTaskName, subTaskDesc, status, startDate, endDate, priority, assignee, taskBoardId } = editingTask;
      let assId = '';
      if (assignee) {
        assId = assignee.assigneeId;
      }
      this.setState({
        _id: _id || '',
        subTaskName: subTaskName || '',
        subTaskDesc: subTaskDesc || '',
        status: status || false,
        startDate: startDate.indexOf('.') < 0 ? startDate : startDate.substring(0, startDate.indexOf('.')) || '',
        endDate: endDate.indexOf('.') < 0 ? endDate : endDate.substring(0, endDate.indexOf('.')) || '',
        priority: priority || -1,
        assignee: assignee || null,
        taskBoardId: taskBoardId || -1,
        assigneeId: assId
      });
    }
    this.props.getAllUsersFunc();
  }
  componentDidMount() {
    const { editingTask, history, match } = this.props;
    if (match.params.action === '1' && editingTask == null) {
      history.go(-1);
      return;
    }
    this.extractData(editingTask, match.params.action);
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.subTaskName !== '' && this.state.subTaskDesc !== '' &&
      this.state.startDate !== '' && this.state.endDate !== '' &&
      this.state.assigneeId !== '' && this.state.assignee !== null) {
      const { match } = this.props;
      const taskData = { ...this.state };
      delete taskData['assigneeId'];
      if (match.params.action === '0') {
        taskData.taskBoardId = match.params.taskBoardId;
        delete taskData['_id'];
      }
      this.props.updateTaskDetailsFunc(taskData, match.params.action);
    }
  }
  getRespMsg(taskUpdateRes, history) {
    if (taskUpdateRes == null) {
      return (
        <p className="text-dark m-0">Fetching task details..</p>
      );
    } else {
      if (taskUpdateRes.status === 1) {
        const timr = setTimeout(() => {
          history.go(-1);
          clearTimeout(timr);
        }, 3000);
        return <p className="text-success m-0">Task updated successfully, redirecting to detail page..</p>;
      }
      else {
        return <p className="text-danger m-0">An error occured while updating task data.
        Please check your internet connection or try after sometime.
        Click <Link to='/'>Here</Link> to go back to home page.</p>
      }
    }
  }
  toggleTaskStatus(status) {
    this.setState({ status });
  }
  render() {
    const { editingTask, allUsers, taskUpdateRes, history, match } = this.props;
    return (
      <div className="container-fluid editTask">
        <div className="card">
          {
            ((editingTask == null || allUsers == null) && (match && match.params.action !== '0')) ? (
              this.getRespMsg(taskUpdateRes, history)
            ) : (
                <TaskForm
                  taskData={this.state}
                  handleInputChange={(e) => this.handleInputChange(e)}
                  handleUserChange={(e) => this.handleUserChange(e)}
                  handleSubmit={(e) => this.handleSubmit(e)}
                  allUsers={allUsers}
                  toggleTaskStatus={status => this.toggleTaskStatus(status)} />
              )
          }
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  editingTask: state.taskDetailsReducer.editingTask,
  allUsers: state.userReducer.allUsers,
  taskUpdateRes: state.taskDetailsReducer.taskUpdateRes,
});
const mapDispatchToProps = (dispatch) => ({
  getAllUsersFunc: () => {
    dispatch(getAllUsers());
    // dispatch(fetchTasDetailsSuccess());
  },
  updateTaskDetailsFunc: (data, action) => {
    dispatch(updateTaskDetails(data, action));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(EditTask);