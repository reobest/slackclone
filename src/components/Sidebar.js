import React, { useEffect} from 'react';
import styled from 'styled-components';
import List from './SideBarList';
import {FaPen} from 'react-icons/fa';
import {IoIosArrowForward,IoIosArrowDown} from 'react-icons/io'
import { Link } from 'react-router-dom';
import { useGlobalContext } from './Context';
import { MdMessage } from "react-icons/md";
import {HiPlus} from 'react-icons/hi'
import {useAuthState} from 'react-firebase-hooks/auth';
import { auth, db } from './Firebase';
import {useCollectionData} from 'react-firebase-hooks/firestore'
import { collection, getDocs } from 'firebase/firestore';
const Sidebar =   () => { 
    const query = collection(db,"users")
    const [docs,loading] = useCollectionData(query)
    const [user] = useAuthState(auth)
    const context = useGlobalContext()
    const {addChannel,clickItem,Icon,handleIcon,r,serR,setChannelName,setClose,close,name,handleName,directMesseges} = context
    const newList = List.map(( member ) => {
        const {id,name,icon} = member
            return <AddChannelContainer key={id}>
                <AddChannelIcon>
                 <div onClick={handleIcon}>{Icon ? <IoIosArrowForward/> : <IoIosArrowDown/>}</div>
                 <p>{name}</p>
                </AddChannelIcon>
            <Svg><HiPlus onClick={addChannel}/></Svg>
         </AddChannelContainer>
    })  
   const getData = async () => {
      const getDo = await   getDocs(query)
      const reo =  getDo.docs.map((chann) => {
          return chann.id
      })
      serR(reo)  
  }
  useEffect(() => {
    getData()
  },[])  
  return (
    <SideBarContainer close={close}>
        <SideBarHeader>
            <h1>{name ||user.displayName}</h1>
            <FaPen onClick={handleName}/> 
        </SideBarHeader>
      {newList}
       {
         !loading && docs.map(function(chann,index) {
          const ChannelRoom = r[index]
          if(Icon) {
            return <Link to={`/${ChannelRoom}`} key={ChannelRoom}><Channels key={ChannelRoom} id={ChannelRoom}   onClick={() => {
              clickItem(ChannelRoom)
              setChannelName(chann.name)
            }}>{`#${chann.name}`}</Channels></Link>
          }
          return null
      })
       }
      <Directmesseges>
        <h1><MdMessage/>  Direct messeges({directMesseges})</h1>
      </Directmesseges>
       <div className='close' onClick={() => setClose(true)}></div>
    </SideBarContainer>
  )
};
export default Sidebar;
const Directmesseges = styled.div`
font-size: 15px;
    padding: 3px;
    box-sizing: border-box;
    padding-left: 5px;
h1{
  display: flex;
    font-size: 15px;
    align-items: center;
    color: #fff;
    @media  only screen  and (max-width:450px) {
     font-size: 10px;
    }
    svg{
      margin-right: 5px;
    font-size: 14px;
    }
}
`
const Channels = styled.div`
   cursor:"pointer";
   color: #fff;
   margin-left: 20px;
   margin-top: 10px;
   font-size: 15px;
   text-decoration: none;
   @media  only screen  and (max-width:450px) {
     font-size: 16px;
     margin: 7px;
    }
`
const SideBarHeader = styled.div`
  margin: 0;
  border-top:solid .5px #6e6969;
  border-bottom: solid .5px #6e6969;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 50px;
  color: #fff;
 > h3{
    opacity: 0.7;
    font-weight: 400;
    margin: 0;
    font-size: 1.3vw;
    div>svg{
        color: green;
        background-color: green;
        border-radius: 50%;
        font-size: 8px;
    }
 }
 >h1{
   margin: 0 0 5px 0 ;
   transform: translateX(3%);
   font-size: 1.4vw;
   font-weight: 700;
   letter-spacing: .2px;
   @media  only screen  and (max-width:450px) {
    margin: 0 ;
    font-size: 12px;
    }
 }
 >svg{
    cursor: pointer;
    border-radius: 50%;
    padding: 8px;
    background-color: #fff;
    color: var(--slack-color);
    right: 5px;
    font-size: 11px;
    position: absolute;
 }
 @media  only screen  and (max-width:450px) {
   >svg{
    padding: 2px;
   }
   >h1{
    margin-left: 5px;
   }
    }
`
const SideBarContainer = styled.div`
position: absolute;
bottom: 0;
  width: 17%;
  height: calc(100% - 6vh);
  background-color: var(--slack-color);
  .close{
    position: absolute;
    background-color: #391055;
    width: 100%;
    height: 50px;
    bottom: 20px;
  }
  @media  only screen  and (max-width:450px) {
   display: ${props => props.close ? 'none' : 'inline-table'};
    }
`
const AddChannelContainer = styled.div`
     display: flex;
     align-items: center;
     justify-content: space-between;
     svg{
  @media  only screen  and (max-width:450px) {
       font-size: 13px;
    }
}
    `
const Svg = styled.div`
      font-size: 1.5vw;
       margin-right: 5px;
       color:#a19898;
       cursor: pointer;
       @media  only screen  and (max-width:450px) {
        font-size: 8px;
    }
    `
const AddChannelIcon = styled.div`
>div>svg{
  cursor: pointer;
}
@media  only screen  and (max-width:450px) {
     >div>svg{
       font-size: 13px;
     }
    }
p{
    margin-left: 5px;
    @media  only screen  and (max-width:450px) {
   font-size: 16px;
   margin: 7px;
    }
}
    font-size: 1.1vw;
    display: flex;
    height: 100%;
    margin-left: 5px;
    align-items: center;
    color:#a19898;
    `