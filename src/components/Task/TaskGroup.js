import React from 'react';
import TaskList from './TaskList';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { sortByDueDate, toggleView, taskListActionTypes } from '../../store/actions/taskGroupActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faColumns } from '@fortawesome/free-solid-svg-icons';

const TaskGroup = ({ taskGroupData, match, sortBy, currentFilter, order, view, toggleView }) => (
  taskGroupData ?
    <div className="container task-group">
      <div className="row">
        <div className="col col-12">
          <h1 className="d-flex align-items-center justify-content-between">
            <span>{taskGroupData[match.params.id].taskName}</span>
            <button className="btn btn-outline-dark" onClick={toggleView} title="Toggle grid/list view">
              {
                view ? <FontAwesomeIcon icon={faList} /> : <FontAwesomeIcon icon={faColumns} />
              }
            </button>
          </h1>
          <TaskList
            taskGroupId={match.params.id}
            currentFilter={currentFilter}
            order={order}
            sortBy={(filter) => sortBy(filter, match.params.id, filter === currentFilter)} />
        </div>
      </div>
    </div> : null
)
const mapStateToProps = (state) => ({
  taskGroupData: state.taskGroupReducer.taskGroupData,
  currentFilter: state.taskGroupReducer.currentFilter,
  order: state.taskGroupReducer.order,
  view: state.taskGroupReducer.view,
});
const mapDispatchToProps = (dispatch) => ({
  sortBy: (filter, taskId, order) => {
    dispatch(sortByDueDate(filter, taskId, order));
  },
  toggleView: () => {
    dispatch(toggleView(taskListActionTypes.TOGGLE_VIEW));
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TaskGroup));