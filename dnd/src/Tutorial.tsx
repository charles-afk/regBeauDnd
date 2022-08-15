// @ts-nocheck
import {useState, Fragment} from 'react'
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

const Tutorial = () => {
    const listContainer = {
        margin:8,border:'1px solid lightgrey',
        borderRadius:2,
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
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

        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;
        
        const start = state.rows[source.droppableId];
        const finish = state.rows[destination.droppableId];

        if(start === finish) {
            const newTabs = Array.from(start.tabNames);
            newTabs.splice(source.index, 1);
            newTabs.splice(destination.index, 0, draggableId);

            const newRow = {
                ...start,
                tabNames: newTabs
            }

            const newState = {
                ...state,
                rows: {
                    ...state.rows,
                    [newRow.id]: newRow
                }
            }

            setState(newState)
            // Tab dropped within own list
            console.log('in')
            
            return
        }
        
        const startTabNames = Array.from(start.tabNames);
        startTabNames.splice(source.index, 1);
        const newStart = {
            ...start,
            tabNames: startTabNames
        };

        const finishTabNames = Array.from(finish.tabNames);
        finishTabNames.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            tabNames: finishTabNames,
        };

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
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                {state.rowOrder.map( (rowName, ind) => {
                    const row = state.rows[rowName]
                    const tabs = row.tabNames.map(name => state.tabs[name])
                    
                    return <Droppable key={row.id} droppableId={row.id} > 
                        { (provided) => ( 
                            <div ref={provided.innerRef} {...provided.droppableProps} style={listContainer}>
                                <h3 style={{padding:8}}>
                                    {row.title}
                                </h3> 
                                {tabs.map((tab,index) => (
                                    <Draggable key={tab.id} draggableId={tab.id} index={index} isDragDisabled={edit}>
                                        { (provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <div style={tabContainer}>
                                                    {tab.id}&nbsp;
                                                    <button disabled={edit} onClick={()=>{
                                                        const newState = [...state];
                                                        newState[ind].splice(index, 1);
                                                        setState(newState.filter(group => group.length));
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
            <div onClick={()=>setEdit(!edit)} style={{cursor:'pointer', padding:8, margin:8}}>
                {editJsx}
            </div>
        </div>
    )
}

export default Tutorial