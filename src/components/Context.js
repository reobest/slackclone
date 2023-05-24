import { collection,addDoc,onSnapshot,query,orderBy } from 'firebase/firestore';
import React, { useState, useContext,useEffect } from 'react';
import { db } from './Firebase';
const AppContext = React.createContext()
const AppProvider = ({ children }) => {
    const colRef = collection(db,"users")
    const [Icon,setIcon] = useState(false)
    const [input,setInput] = useState('')
    const [channel,setChannel] = useState([])
    const [showMessege,setShowMessege] = useState(false)
    const [disabled,setDisabled] = useState(true)
    const  [roomId,setRoomId] = useState('')
    const [r,serR] = useState([])
    const [messege,setMessege] = useState([])
    let [i,setI] = useState(0)
    const handleIcon = () => {
        setIcon(!Icon)
    }
    let clickItem = (id) => { 
        setRoomId(id)
        const messegeRef =   collection(db,"users",`${id}`,"messeges")
        const q = query(messegeRef,orderBy("date","asc"))
        const unsub =  onSnapshot(q, (snapshot) => setMessege(snapshot.docs.map((doc) => ({...doc.data()})))) 
        setShowMessege(true)
        setDisabled(false)
        return unsub
    }
    useEffect(() => {
        clickItem()
        setDisabled(true)
    },[])
    const addChannel = async () => { 
        setI(i=i+1)     
        const newName = prompt("Please Enter a Channel Name")
        const dataRoom = {
            name:newName,
        }
        if(newName == null) {
            return
        } 
            addDoc(colRef,dataRoom)
     }  
    useEffect(() => { 
    },[messege])
  return (
    <AppContext.Provider value={{channel,setChannel,addChannel,clickItem,input,setInput,showMessege,disabled,setDisabled,Icon,handleIcon,roomId,r,serR,messege,setMessege,setRoomId}}>
      {children}
    </AppContext.Provider>
  )
}
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
