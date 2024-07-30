import React from "react";
import { useDrag } from 'react-dnd';

export const DragItem = ({id, title}) => {
    
    const [{isDragging}, drag] = useDrag(()=>({
        type:'BOX',
        item: { id, title },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    }));


    return(
    <div ref={drag} style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '8px',
        margin: '4px',
        backgroundColor: 'lightgrey',
        cursor: 'move',
    }}>
        {title}
    </div>)

}