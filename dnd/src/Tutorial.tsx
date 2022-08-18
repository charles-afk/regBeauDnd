// @ts-nocheck
import {useState, Fragment} from 'react'
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import './App.css';

const Tutorial = () => {
    const listContainer = {
        margin:8,border:'1px solid lightgrey',
        borderRadius:2,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        width: 505,
    }

    const tabContainer = {
        margin:8,
        border:'3px solid lightgrey',
        borderRadius:2,
        padding:8,
    }

    const config = {
        tabs: {
            'snapchat': {id:'snapchat', visible:true, extra:false, order:1},
            'youtube': {id:'youtube', visible:true, extra:false, order:2},
            'instagram': {id:'instagram', visible:true, extra:false, order:3},
            'facebook': {id:'facebook', visible:true, extra:true, order:4}
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

    const [state, setState] = useState(config);
    const [edit, setEdit] = useState(true);

    const editJsx = <Fragment>
        {edit ? 'Edit +' : 'Update'}
    </Fragment>

    const onDragEnd = result => {
        const { destination, source, draggableId } = result;
        /** draggableId: youtube
         *  type: 'TYPE'
         *  reason: DROP
         *  source: {
         *      droppableId: row-1
         *      index: 0
         *  }
         *  destination: {
         *      droppableId: row-2
         *      index: 1
         *  }
         */

        // dropped outside of the list
        if (!destination) return;
        // location of drop hasnt changed from its original
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;
        
        // references row where event starts, and finishes
        const start = state.rows[source.droppableId];
        const finish = state.rows[destination.droppableId];

        // starts and finished in the same row
        if(start === finish) {
            // what the new row will look like
            const newTabs = Array.from(start.tabNames);
            // remove old location
            newTabs.splice(source.index, 1);
            // place in new location
            newTabs.splice(destination.index, 0, draggableId);

            // updated new row
            const newRow = {
                ...start,
                tabNames: newTabs
            }

            // updated state
            const newState = {
                ...state,
                rows: {
                    ...state.rows,
                    [newRow.id]: newRow
                }
            }

            setState(newState)
            return
        }
        
        // Move from one row to the next
        const startTabNames = Array.from(start.tabNames);
        startTabNames.splice(source.index, 1);
        // updated start row
        const newStart = {
            ...start,
            tabNames: startTabNames
        };

        const finishTabNames = Array.from(finish.tabNames);
        finishTabNames.splice(destination.index, 0, draggableId);
        // updated finish row
        const newFinish = {
            ...finish,
            tabNames: finishTabNames,
        };

        // updated state
        const newState = {
            ...state,
            rows: {
                ...state.rows,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        };

        setState(newState)
        // Tab dropped outside of own list
        console.log('out')
    };

    return (
        <div style={{display:'flex',flexDirection:'row'}}>
            <div style={{display:'flex',flexDirection:'column'}}>
                <DragDropContext onDragEnd={onDragEnd}>
                    {state.rowOrder.map( (rowName) => {
                        const row = state.rows[rowName]
                        const tabs = row.tabNames.map(name => state.tabs[name])
                        
                        
                        return <Droppable key={row.id} droppableId={row.id} direction='horizontal'> 
                            {/* droppableSnapshot = {
                                    isDraggingOver: true,
                                    draggingOver: 'row-2',
                                } */}
                            { (provided, snapshot) => ( 
                                <div ref={provided.innerRef} {...provided.droppableProps} style={listContainer}>
                                    {tabs.map((tab,index) => (
                                        <Draggable key={tab.id} draggableId={tab.id} index={index} isDragDisabled={edit}>
                                            {/* 
                                                draggableSnapshot = {
                                                    isDragging: true,
                                                    draggingOverWith: 'facebook',
                                                }
                                            */}
                                            { (provided, snapshot) => (
                                                <div ref={provided.innerRef} 
                                                {...provided.draggableProps} 
                                                {...provided.dragHandleProps} 
                                                isdragging={snapshot.isDragging}>
                                                    <div className='tabContainer'>
                                                        {tab.id}&nbsp;
                                                        <button disabled={edit} onClick={()=>{
                                                            let newState = [...state.rows[rowName].tabNames];
                                                            console.log(tab.id, newState);
                                                            newState = newState.filter(tabRemoved => tabRemoved !== tab.id)
                                                            console.log(newState)
                                                        }}>X</button>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                {provided.placeholder}
                                </div>
                            )}
                        </Droppable>;
                    })}
                </DragDropContext>
            </div>
            <div onClick={()=>setEdit(!edit)} style={{cursor:'pointer', padding:8, margin:8}}>
                {editJsx}
            </div>
        </div>
    )
}

export default Tutorial