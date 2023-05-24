import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useGlobalContext } from './Context'
import { db } from './Firebase'
import { collection } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
const Messeges = () => {
    const {id} = useParams()
    const context = useGlobalContext()
    const {showMessege,messege} = context
      const messegeCollection = collection(db,"users",`${id}`,"messeges")
      const [docs,loading] =  useCollectionData(messegeCollection)
     const  thisMessege = !loading ? docs.map((messege) => {
        return messege
     }) : null
   if(thisMessege) {
      return (
        <>
           { showMessege &&
                  messege.map((Messege) => {
                   const {name,messege,userimage,date} = Messege
                     return <MessegesContainer key={Date.now() + Math.random()}>
                             <UserProfilePhoto src={userimage}/>
                             <div>
                             <UserInfo>
                                     <h5>{name}</h5>
                                     <TimeStamp> {date} </TimeStamp>    
                                 </UserInfo>                              
                               <h6>{messege}</h6>
                             </div>                              
                             </MessegesContainer> 
            })
           }
        </>
      )
    } 
}
export default Messeges
const MessegesContainer = styled.div`
display:flex;
justify-content: flex-start;
align-items: center;
margin-left: 15px;
margin-top: 15px;
width: 300px;
height: 35px;
>div{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 35px;
  margin-left: 10px;
}
>div>h6{
  font-size: 12px;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  height: auto;
}
@media  only screen  and (max-width:450px) {
    width: 250px;
}
`
const UserProfilePhoto = styled.img`
cursor: pointer;
border-radius: 4px;
 height: 36px;
 width: 36px;
`
const UserInfo = styled.div`
display: flex;
align-items: center;
>h5{
  font-size: 10px;
  margin: 0;
 }
 >p{
  font-size: 9px;
    margin: 0;
    margin-left: 10px;
 }
 @media  only screen  and (max-width:450px) {
  >h6{
    font-size: 13px;
  }
  >p{
    font-size: 9px;
  }
}
`
const TimeStamp = styled.p`
  @media  only screen  and (max-width:450px) {
    font-size: 9px;
}
`
