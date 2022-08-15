// @ts-nocheck
import {useState} from 'react'
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

const Tutorial = () => {
    const config = {
        tabs: {
            'snapchat': {id:'1', visible:true, extra:false, order:1, name:'snapchat'},
            'youtube': {id:'2', visible:true, extra:false, order:2, name:'youtube'},
            'instagram': {id:'3', visible:true, extra:false, order:3, name:'instagram'},
            'facebook': {id:'4', visible:true, extra:true, order:4, name:'facebook'}
        },
        rows: {
            'row-1': {
                id:'row-1',
                title:'Main Tabs',
                tabNames:['snapchat','youtube','instagram']
            },
            'row-2': {
                id:'row-2',
                title:'Extra Tabs',
                tabNames:['facebook']
            }
        },
        rowOrder: ['row-1','row-2']
        
    }

    const listContainer = {
        margin:8,border:'1px solid lightgrey',
        borderRadius:2,
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    }

    const tabList = {
        display:'flex',
        flexDirection:'row',
    }

    const tabContainer = {
        margin:8,
        border:'3px solid lightgrey',
        borderRadius:2,
        padding:8
    }

    const [state, setState] = useState(config);

    const onDragEnd = result => {
        // TODO: reorder our column
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {state.rowOrder.map( (rowName) => {
                const row = state.rows[rowName]
                const tabs = row.tabNames.map(name => state.tabs[name])
                
                return <Droppable key={row.id} droppableId={row.id} > 
                    { (provided, snapshot) => ( 
                        <div ref={provided.innerRef} {...provided.droppableProps} style={listContainer}>
                            <h3 style={{padding:8}}>
                                {row.title}
                            </h3> 
                            {tabs.map((tab,index) => (
                                <Draggable key={tab.id} draggableId={tab.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <div style={tabContainer}>
                                                {tab.name}
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </div>
                    )}
                </Droppable>;
            })}
        </DragDropContext>
    )
}

export default Tutorial