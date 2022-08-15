import {useEffect} from 'react'

const Tutorial = () => {
    const config = {
        tabs: {
            'snapchat': {
                id: 1,
                visible:true,
                extra:false,
                order:1
            },
            'youtube': {
                id: 2,
                visible:true,
                extra:false,
                order:2
            },
            'instagram': {
                id: 3,
                visible:true,
                extra:false,
                order:3
            },
            'facebook': {
                id: 4,
                visible:true,
                extra:true,
                order:4
            }
        },
        row: {
            'row-1': {
                id:'row-1',
                title:'Main Tabs',
                tabIds:['snapchat','youtube','instagram']
            },
            'row-2': {
                id:'row-2',
                title:'Extra Tabs',
                tabIds:['facebook']
            }
        },
        rowOrder: {
            rowOrder: ['row-1','row-2']
        }
    }

    useEffect(()=>console.log(config))
    

    return (
        <div>Tutorial</div>
    )
}

export default Tutorial