import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from './Context'
import {useAuthState} from 'react-firebase-hooks/auth';
import { auth, db } from './Firebase';
import Messeges from './Messeges'
import { addDoc, collection ,query,orderBy, onSnapshot} from 'firebase/firestore';
const Chat = () => {
    const chatRef = useRef()
    const [user,loading] = useAuthState(auth)
    const context = useGlobalContext()
    const {input,setInput,disabled,roomId,setMessege,messege,close} = context
    const handleSubmit = (e) => {
      e.preventDefault()
      const messegeRef =  collection(db,"users",`${roomId}`,"messeges")
      const q = query(messegeRef,orderBy("date","asc"))
      const messegeData = {
        name:user.displayName,
        messege:input,
        userimage:user.photoURL,
        date:new Date().toUTCString(),
      }
      const unsub = onSnapshot(q, (snapshot) => 
         setMessege(snapshot.docs.map((doc) => ({...doc.data(),messegeData})))
      )
      addDoc(messegeRef,messegeData)
      setInput('')
      return unsub
  }
  useEffect(() => {
    chatRef.current.scrollIntoView({
      behavior:"smooth",
    })
  },[messege,loading])
  return (
    <ChatContainer close={close}>
        <ChannelName close={close}>
          {`#${user.displayName}`}
        </ChannelName>
        <Messeges/>
        <ChatForm onSubmit={handleSubmit}>
            <ChatButton></ChatButton>
          <ChatInput  disabled={ disabled ? true : false} placeholder={`messege #${user.displayName}`} value={input} onChange={(e) => setInput(e.target.value) }/>    
        </ChatForm>
        <div style={{width:"100%",height:"2px"}} ref={chatRef}></div>
    </ChatContainer>
  )
}
export default Chat
const ChannelName = styled.div`
display: flex;
align-items: center;
border-bottom: .5px solid #edd4d4;
font-size: 13px;
font-weight: 900;
height: 50px;
width: 100%;
position: fixed;
top: 6vh;
left: 18%;
z-index: 200;
background-color: #fff;
@media  only screen  and (max-width:450px) {
    margin-left: ${props => props.close ? '-60px' : '50px'};
    width:100%
}
>h1{
    margin: 0 0 0 15px;
}
`
const ChatContainer = styled.div`
    height: 78%;
    width: 83%;
    position: absolute;
    right: 0;
    top: 14%;
    overflow-y: scroll;
    @media  only screen  and (max-width:450px) {
    width: ${props => props.close ? '100%' : '70%'};
}
`
const ChatInput = styled.input`
    position: fixed;
    right: 52%;
    transform: translateX(63.5%);
    bottom: 15px;
    width: 75vw;
    border: solid .5px;
    border-color: #adb4b5;
    height: 30px;
    padding-left: 15px;
    outline: none;
    border-radius: 2px;
    font-size: 16px;
    ::placeholder{
        font-size: 15px;
    }
@media  only screen  and (max-width:450px) {
  transform: translateX(53%);
}
`
const ChatButton = styled.button`
display: none;
`
const ChatForm = styled.form`



`