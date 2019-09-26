import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDateFormatted } from '../../utilities/utility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { fetchTaskGroup, setCreateNewBoardDataNull } from '../../store/actions/taskGroupActions';
import { fetchTaskGroupData } from '../../utilities/service';

class TaskGroupList extends React.Component {
  componentDidMount() {
    this.props.taskGroupListFunc();
    this.props.setCreateNewBoardDataNullFunc();
  }
  render() {
    let taskGroupList = this.props.taskGroupList;
    return (
      <div className="container mt-3">
        <h1 className="mb-3">Task Boards</h1>
        <div className="row">
          <Link className="col col-4 text-dark text-decoration-none" to={`/create-new-board`}>
            <div className="card text-center h-100 d-flex align-item-center justify-content-center">
              <span><FontAwesomeIcon icon={faPlus} /><br /></span>
              <span>Create New Board</span>
            </div>
          </Link>
          {
            taskGroupList && taskGroupList.length > 0 ? (
              taskGroupList.map((item, index) => (
                <Link className="col col-4 text-dark text-decoration-none"
                  to={`/tasks/${item._id}`} key={index}>
                  <div className="card h-100">
                    <div className="card-body">
                      <h6>{item.taskName}</h6>
                    </div>
                    <div className="card-footer bg-white">
                      <div className="d-flex align-items-center justify-content-between">
                        <span>
                          <img src={item.creator && item.creator.profileImage !== '' ? item.creator.profileImage :
                            require('../../assets/img/user.png')} alt="profile img" className="img-fluid userIcon"
                            title={item.creator && item.creator.name ? item.creator.name : ''} />
                        </span>
                        <span>{
                          (item.endDate && item.endDate !== '') ?
                            getDateFormatted(item.startDate) + " - " + getDateFormatted(item.endDate) :
                            getDateFormatted(item.startDate)
                        }</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : null
          }
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  taskGroupList: state.taskGroupReducer.taskGroupData
});

const mapDispatchToProps = (dispatch) => ({
  taskGroupListFunc: () => {
    dispatch(fetchTaskGroup(fetchTaskGroupData))
  },
  setCreateNewBoardDataNullFunc() {
    dispatch(setCreateNewBoardDataNull())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskGroupList);