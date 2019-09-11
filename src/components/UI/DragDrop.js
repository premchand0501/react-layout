import React from 'react';
import '../scss/App.scss';
import Droppable from './Droppable';
import Draggable from './Draggable';

class DragDrop extends React.Component {
  state = {
    dragEl: null
  }
  allowDrop(e) {
    e.preventDefault();
  }
  drag(e) {
    this.setState({
      dragEl: e.target
    })
  }
  drop(e) {
    e.preventDefault();
    e.target.appendChild(this.state.dragEl);
  }
  render() {
    return (
      <div className="dragdrop">
        <Droppable dropEl={this.state.dragEl}></Droppable>
        <Droppable dropEl={this.state.dragEl}>
          <Draggable handleDragStart={(e) => this.drag(e)}>
            <img src={require('../img/chakra.png')} alt="img" />
          </Draggable>
        </Droppable>
      </div>
    );
  }
}

export default DragDrop;
