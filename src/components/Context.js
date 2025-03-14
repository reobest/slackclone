import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import React, { useState, useContext, useEffect } from 'react';
import { db } from './Firebase';
const AppContext = React.createContext()
const AppProvider = ({ children }) => {
  const colRef = collection(db, "users")
  const [Icon, setIcon] = useState(false)
  const [input, setInput] = useState('')
  const [channel, setChannel] = useState([])
  const [showMessege, setShowMessege] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [roomId, setRoomId] = useState('')
  const [r, serR] = useState([])
  const [messege, setMessege] = useState([])
  const [channelName, setChannelName] = useState("")
  const [name, setName] = useState("")
  let [Counter, setCounter] = useState(0)
  const [close, setClose] = useState(false)
  const [directMesseges, setDirectMesseges] = useState(0)
  const handleIcon = () => {
    setIcon(!Icon)
  }
  let clickItem = (id) => {
    setRoomId(id)
    const messegeRef = collection(db, "users", `${id}`, "messeges")
    const q = query(messegeRef, orderBy("date", "asc"))
    const unsub = onSnapshot(q, (snapshot) => setMessege(snapshot.docs.map((doc) => ({ ...doc.data() }))))
    setShowMessege(true)
    setDisabled(false)
    return unsub
  }
  useEffect(() => {
    clickItem()
    setDisabled(true)
  }, [])
  const addChannel = async () => {
    setCounter(prev => prev + 1)
    const newName = prompt("Please Enter a Channel Name")
    if (newName === null) {
      return
    }
    const password = prompt("Would you like to add a password for this channel? If yes, enter a password.");

    const dataRoom = {
      name: newName,
      password: password ? password : null, // Save the password if provided, otherwise set it as null
    };

    addDoc(colRef, dataRoom)
  }
  const handleName = () => {
    const newName = prompt("Please Enter a Channel Name")
    setName(newName)

  }
  useEffect(() => {
  }, [messege])
  return (
    <AppContext.Provider value={{ channel, setChannel, addChannel, clickItem, input, setInput, showMessege, disabled, setDisabled, Icon, handleIcon, roomId, r, serR, messege, setMessege, setRoomId, setChannelName, channelName, close, setClose, name, handleName, directMesseges, setDirectMesseges }}>
      {children}
    </AppContext.Provider>
  )
}
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
