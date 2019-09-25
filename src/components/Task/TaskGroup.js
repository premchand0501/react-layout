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
      <div className="container task-group mt-3">
        <div className="row">
          <div className="col col-12">
            <h1 className="d-flex align-items-center justify-content-between">
              <span>{taskGroupData.taskName}</span>
              <button className="btn btn-outline-dark pl-1 pr-1" onClick={toggleViewFunc} title="Toggle grid/list view" style={{ minWidth: '100px' }}>
                {
                  view ? <FontAwesomeIcon icon={faList} /> : <FontAwesomeIcon icon={faColumns} />
                }
                {
                  (!view ? ' List' : ' Grid') + ' View'
                }
              </button>
            </h1>
            <p>{taskGroupData.taskDesc}</p>
            <TaskList
              taskListData={taskListData}
              taskGroupId={match.params.id}
              currentFilter={currentFilter}
              order={order}
              sortBy={(filter) => sortBy(filter, match.params.id, order)} />
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
    console.log(filter, taskId, order);
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskGroup));