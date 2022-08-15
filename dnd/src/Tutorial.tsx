// @ts-nocheck
import {useState} from 'react'

const Tutorial = () => {
    const config = {
        tabs: {
            'snapchat': {id:1, visible:true, extra:false, order:1, name:'snapchat'},
            'youtube': {id:2, visible:true, extra:false, order:2, name:'youtube'},
            'instagram': {id:3, visible:true, extra:false, order:3, name:'instagram'},
            'facebook': {id: 4, visible:true, extra:true, order:4, name:'facebook'}
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

    return (
        state.rowOrder.map((rowName) => {
            const row = state.rows[rowName]
            const tabs = row.tabNames.map(name => state.tabs[name])
            
            return <div key={row.id} style={{margin:8,border:'1px solid lightgrey',borderRadius:2}}>
                <h3 style={{padding:8}}>
                    {row.title}
                </h3>
                {tabs.map(tab => {
                    return <div key={tab.id} >
                        <div style={{margin:8,border:'1px solid lightgrey',borderRadius:2,padding:8}}>
                            {tab.name}
                        </div>
                    </div>;
                })}
            </div>;
        })
    )
}

export default Tutorial