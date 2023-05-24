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
  const {messege,setMessege,roomId} = context
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
        <HeaderLeft>
        </HeaderLeft>
        <HeaderSearch>
         <BiTimeFive/>
         <Input placeholder={`Search ${user.displayName}`} onChange={(e) => handleSearch(e.target.value)}/>
         <IoIosSearch/>
        </HeaderSearch>
        <HeaderRight>
          <RiQuestionLine/>
          <img src={user.photoURL} onClick={signout} alt='user'/>
        </HeaderRight>
    </Container>
  )
}
export default Header
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
}
>svg{
    font-size:12px;
    color: #fff;
}
>img{
  width: 25px;
  border-radius: 50%;
}
`