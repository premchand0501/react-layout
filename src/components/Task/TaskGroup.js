import React from 'react';
import TaskList from './TaskList';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faColumns } from '@fortawesome/free-solid-svg-icons';
import { fetchTaskGroupDetailsBy } from '../../store/actions/taskGroupActions';
import { fetchTaskList, toggleView, sortTaskListBy } from '../../store/actions/taskListActions';

class TaskGroup extends React.Component {
  componentDidMount() {
    this.props.fetchTaskGroupDetailsBy(this.props.match.params.id);
    this.props.getTaskListByTaskGroupId(this.props.match.params.id);
  }
  render() {
    const { taskGroupData, taskListData, match, sortBy, currentFilter, order, view, toggleViewFunc } = { ...this.props };
    return taskGroupData ?
      <div className="container task-group">
        <div className="row">
          <div className="col col-12">
            <h1 className="d-flex align-items-center justify-content-between">
              <span>{taskGroupData.taskName}</span>
              <button className="btn btn-outline-dark" onClick={toggleViewFunc} title="Toggle grid/list view">
                {
                  view ? <FontAwesomeIcon icon={faList} /> : <FontAwesomeIcon icon={faColumns} />
                }
              </button>
            </h1>
            <TaskList
              taskListData={taskListData}
              taskGroupId={match.params.id}
              currentFilter={currentFilter}
              order={order}
              sortBy={(filter) => sortBy(filter, match.params.id, filter === currentFilter)} />
          </div>
        </div>
      </div> : null
  }
}
const mapStateToProps = (state) => ({
  taskGroupData: state.taskGroupReducer.taskGroupData,
  taskListData: state.taskListReducer.taskListData,
  currentFilter: state.taskListReducer.currentFilter,
  order: state.taskListReducer.order,
  view: state.taskListReducer.view,
});
const mapDispatchToProps = (dispatch) => ({
  sortBy: (filter, taskId, order) => {
    dispatch(sortTaskListBy(filter, taskId, order));
  },
  toggleViewFunc: () => {
    dispatch(toggleView());
  },
  getTaskListByTaskGroupId: (id) => {
    dispatch(fetchTaskList(id));
  },
  fetchTaskGroupDetailsBy: (id) => {
    dispatch(fetchTaskGroupDetailsBy(id));
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TaskGroup));