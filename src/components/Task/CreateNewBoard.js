import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { createNewTaskBoardDispatcher } from '../../store/actions/taskGroupActions';

class CreateNewBoard extends React.Component {
  state = {
    taskName: '',
    taskDesc: '',
    startDate: '',
    endDate: '',
    creatorId: '',
  }
  componentDidMount() {
    console.log(this.props.userReducer);
  }
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.props.userReducer)
    if (this.props.userReducer.userData != null) {
      const userData = this.props.userReducer.userData;
      const data = { ...this.state };
      data.creatorId = userData._id;
      this.props.createNewBoardFunc(data)
    }
  }
  render() {
    const { history, taskGroupReducer } = this.props;
    if (taskGroupReducer && taskGroupReducer.createNewTaskBoard != null) {
      history.go(-1);
    }
    return (
      <div className="container mt-3 mb-3">
        <div className="row">
          <div className="col col-12">
            <div className="card ml-auto mr-auto" style={{ maxWidth: '500px' }}>
              <form className="card-body" onSubmit={(e) => this.handleSubmit(e)}>
                <h2>
                  <button className="btn btn-outline-dark mr-3" onClick={() => history.go(-1)}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                  Create New Board</h2>
                <hr />
                <div className="form-group">
                  <span>Task Board Name</span>
                  <input type="text" className="form-control" placeholder="Task Name" name="taskName"
                    value={this.state.taskName} onChange={(e) => this.handleInputChange(e)} />
                </div>
                <div className="form-group">
                  <span>Description</span>
                  <input type="text" className="form-control" placeholder="Task Description" name="taskDesc"
                    value={this.state.taskDesc} onChange={(e) => this.handleInputChange(e)} />
                </div>
                <div className="row">
                  <div className="col col-6">
                    <div className="form-group">
                      <span>Start Date</span>
                      <input type="datetime-local" className="form-control" placeholder="Start Date" name="startDate"
                        value={this.state.startDate} onChange={(e) => this.handleInputChange(e)} required />
                    </div>
                  </div>
                  <div className="col col-6">
                    <div className="form-group">
                      <span>End Date</span>
                      <input type="datetime-local" className="form-control" placeholder="Start Date" name="endDate"
                        value={this.state.endDate} onChange={(e) => this.handleInputChange(e)} required />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
  taskGroupReducer: state.taskGroupReducer,
});
const mapDispatchToProps = (dispatch) => ({
  createNewBoardFunc(data) {
    dispatch(createNewTaskBoardDispatcher(data))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(CreateNewBoard);