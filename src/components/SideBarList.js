import React from 'react'
import {MdInsertComment,MdDrafts,MdBookmarkBorder,MdPeopleAlt,MdApps,MdFileCopy} from 'react-icons/md'
import {HiInbox} from 'react-icons/hi'

const List = [
    {
        id:1,
        name:"Threads",
        icon:<MdInsertComment/>,

    },
    {
        id:2,
        name:"Mentions & reactions",
        icon:<HiInbox/>,
    },
    {
        id:3,
        name:"Saved items",
        icon:<MdDrafts/>,
    },
    {
        id:4,
        name:"Channel browser",
        icon:<MdBookmarkBorder/>
    },
    {
        id:5,
        name:"People & user groups",
        icon:<MdPeopleAlt/>,
    },
    {
        id:6,
        name:"Apps",
        icon:<MdApps/>,

    },
    {
       id:7,
       name:"File browser",
       icon:<MdFileCopy/>,

    },
    {
        id:9,
        name:"Channels"

    },
]
export default List