import React, { useState } from 'react'
import { useGlobalContext } from './Context'
import styled from 'styled-components'
import {IoIosSearch} from 'react-icons/io'
import {BiTimeFive} from 'react-icons/bi'
import {RiQuestionLine} from 'react-icons/ri'
import {useAuthState} from 'react-firebase-hooks/auth';
import { auth } from './Firebase';
import { collection,onSnapshot,query,orderBy } from 'firebase/firestore';
import { db } from './Firebase';
const Header = () => {
  const context = useGlobalContext()
  const {messege,setMessege,roomId,channelName} = context
  const [help,setHelp] = useState(false)
  const [channelNameAppeer,setChannelNameAppeer] = useState(false)
  const externalLink = 'https://app.slack.com/';
  const [user] = useAuthState(auth)
  const signout  = () => {
    auth.signOut()
  }
  const handleSearch = (value) => {
    if(value) {
      setMessege(messege.filter((m) => m.messege ===  value))  
    }
    if(value === '' ){
      const messegeRef =   collection(db,"users",`${roomId}`,"messeges")
      const q = query(messegeRef,orderBy("date","asc"))
      const unsub =  onSnapshot(q, (snapshot) => setMessege(snapshot.docs.map((doc) => ({...doc.data()}))))
    }
  }
  return (
    <Container>
      {channelNameAppeer && <LastChannel>
        Last Channel : {channelName}
      </LastChannel>}
        <HeaderLeft>
        </HeaderLeft>
        <HeaderSearch>
         <BiTimeFive onClick={() => setChannelNameAppeer(prev => !prev)}/>
         <Input placeholder={`Search ${user.displayName}`} onChange={(e) => handleSearch(e.target.value)}/>
         <IoIosSearch/>
        </HeaderSearch>
        <HeaderRight>
          <RiQuestionLine onClick={()=> setHelp(prev => !prev)}/>
          <img src={user.photoURL} onClick={signout} alt='user'/>
        </HeaderRight>
        {help && <Slack  href={externalLink}>Want Help</Slack>}
    </Container>
  )
}
export default Header
const LastChannel = styled.div`
    background: #fff;
    position: absolute;
    color: #000;
    left: 60px;
    top: 10px;
    font-weight: 700;
    font-size: 12px;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 3px;
    justify-content: flex-start;
    align-items: center;
    display: flex;
    height: 60%;
    width: 200px;
@media  only screen  and (max-width:450px) {
  left: 7px;
  top: 580px;
  font-size: 9px;
  width: 100px;
}
`
const Slack = styled.a`
    width: 100px;
    position: absolute;
    right: 65px;
    border-radius: 50%;
    text-align: center;
    top: 15px;
    border: #fff solid 1px;
    font-size: 12px;
    color: #fff;
    @media  only screen  and (max-width:450px) {
  right: 60px;
  top: 14px;
  font-size: 7px;
  width: 40px;
}
`
const Container = styled.div`
   z-index: 100;
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   height: 6vh;
   background-color: var(--slack-color);
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 0 10px;
`
const HeaderLeft = styled.div`

`
const HeaderSearch = styled.div`
    position: relative;
    display: flex;
    align-items: center;
  >svg:nth-child(1) {
    font-size: 18px;
    color: #fff;
    margin-right: 1vw;
  }
>svg:nth-child(3) {
    color: #fff;
    position: absolute;
    right: 1%;
    cursor: pointer;
    font-size: 18px;
}
`
const Input = styled.input`
    color: #fff;
    width: 50vw;
    height: 26px;
    border-radius: 5px;
    border: none;
    background-color: #603164 ;
    outline: none;
    padding-left: 5px;
    ::placeholder{
      color: white;
      font-size: 12px;
    }
`
const HeaderRight = styled.div`
display: flex;
align-items: center;
>svg:nth-child(1) {
    margin-right: 10px;
    font-size:12px;
    color: #fff;
}
>img{
  width: 25px;
  border-radius: 50%;
}
`