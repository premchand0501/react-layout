import React from 'react';

const Draggable = ({ className, children, handleDragStart }) => (
  <div onDragStart={(e) => handleDragStart(e)} draggable="true" className={className}>
    {children}
  </div>
)
export default Draggable;