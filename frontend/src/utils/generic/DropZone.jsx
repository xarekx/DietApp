import React from "react";
import { useDrop } from "react-dnd";

export const DropZone = ({ onDrop, droppedItems }) => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept:'BOX',
        drop: (item) => onDrop(item.id, item.title),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        })
    }))

    return(
        <div ref={drop} style={{
            height: '200px',
            width: '200px',
            border: '2px dashed grey',
            backgroundColor: isOver ? 'lightblue' : 'white',
        }}>
            <ul>
            {droppedItems.map((item, index) => (
              <li key={index}>{item.title}</li>
            ))}
          </ul>
        </div>
    )
}