import React from 'react';

const Droppable = ({ handleDrop, className, children }) => (
  <div className={`${className} drop-area`}
    onDrop={(e) => {
      handleDrop(e);
      if (e.target.classList.contains('dragover'))
        e.target.classList.remove('dragover')
    }}
    onMouseLeave={(e) => {
      if (e.target.classList.contains('dragover'))
        e.target.classList.remove('dragover')
    }}
    onDragOver={(e) => {
      e.preventDefault();
      if (!e.target.classList.contains('dragover'))
        e.target.classList.add('dragover')
    }}>
    {children}
  </div>
)
export default Droppable;