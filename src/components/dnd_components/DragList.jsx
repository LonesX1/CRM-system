import React from 'react';
import classes from '../style_module/Header.module.css';

const DragList = ({draggableItem, setDraggableItem}) => {
    const dragStart = (e, index) => {
      e.dataTransfer.setData('index', index);
      e.target.classList.add('hide');
    };

    const dragEnd = (e) => {
      e.target.classList.remove('hide');
    };

    const dragOver = function (e) {
      e.preventDefault();
    };

    const dragEnter = (e) => {
      e.preventDefault();
      e.target.parentElement.classList.add('hovered');
    };

    const drop = (e, index) => {
      e.target.parentElement.classList.remove('hovered');
      const sourceIndex = e.dataTransfer.getData('index');
      const newDraggableItem = [...draggableItem];
      const sourceItem = newDraggableItem[sourceIndex];
      const targetItem = newDraggableItem[index];

      if (sourceItem.disabled || targetItem.disabled) {
        return;
      }

      newDraggableItem[sourceIndex] = targetItem;
      newDraggableItem[index] = sourceItem;

      setDraggableItem(newDraggableItem);
    };

    const dragLeave = (e) => {
      e.preventDefault();
      e.target.parentElement.classList.remove('hovered');
    };
  
    return ( 
      <div className={classes.dragAndDropFields}>
        {
        draggableItem.map( (i, index) => 
                        <div 
                          onDrop={(e) => drop(e, index)}
                          onDragEnter={(e) => dragEnter(e)}
                          onDragLeave={(e) => dragLeave(e)}
                          onDragOver={(e) => dragOver(e)}
                          key={i.id} 
                          className={classes.container}
                          >
                            <div            
                              onDragStart={(e) => dragStart(e, index)}
                              onDragEnd={(e) => dragEnd(e)}
                              draggable={!i.disabled} 
                              className={classes.field}
                            >{i.name}</div>
                        </div>    
                        )
        }
      </div>
     );
}
 
export default DragList;