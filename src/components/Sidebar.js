import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FaPen } from 'react-icons/fa';
import { SlArrowRight } from "react-icons/sl";
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io'
import { Link } from 'react-router-dom';
import { useGlobalContext } from './Context';
import { MdMessage } from "react-icons/md";
import { HiPlus } from 'react-icons/hi'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './Firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { collection, getDocs } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
const Sidebar = () => {
  
  const query = collection(db, "users")
  const [docs, loading] = useCollectionData(query)
  const [user] = useAuthState(auth)
  const context = useGlobalContext()
  const { addChannel, clickItem, Icon, handleIcon, r, serR, setChannelName, setClose, close, name, handleName, directMesseges,setMessege } = context
  useEffect(() => {
    const getData = async () => {
      const getDo = await getDocs(query)
      const reo = getDo.docs.map((chann) => {
        return chann.id
      })
      serR(reo)
    }
    getData()
  }, [])
  const handleChannelClick = (chann,password) => {;
    if (password) {
      const enteredPassword = prompt("This channel is password protected. Please enter the password:");
      if (enteredPassword === password) {
        clickItem(chann);
        setChannelName(chann.name);
        setMessege([])
      } else {
        alert("Incorrect password!");
      }
    } else {
      clickItem(chann);
      setChannelName(chann.name);
      setMessege([])
    }
  };
  return (
    <SideBarContainer close={close}>
      <SideBarHeader  close={close}>
        <h1>{name || user.displayName}</h1>
        <FaPen onClick={handleName} />
      </SideBarHeader>
      <AddChannelContainer close={close}>
        <span onClick={handleIcon}>Channels{Icon ? <IoIosArrowForward /> : <IoIosArrowDown />}</span>
        <Svg><HiPlus onClick={addChannel} /></Svg>
      </AddChannelContainer>
      {!loading && docs.map(function (chann, index) {
        const ChannelRoom = r[index];
        if (Icon) {
          return (
            <Link to={`/${ChannelRoom}`} key={index}>
              <Channels
                close={close}
                key={ChannelRoom}
                id={ChannelRoom}
                onClick={() => handleChannelClick(ChannelRoom,chann.password)}
              >
                {`#${chann.name}`}
              </Channels>
            </Link>
          );
        }
        return null;
      })
      }
      <Directmesseges close={close}>
        <h1><MdMessage />  Direct messeges({directMesseges})</h1>
      </Directmesseges>
      <SlArrowRight className='close' onClick={() => setClose(prev => !prev)}></SlArrowRight>
    </SideBarContainer>
  )
};
export default Sidebar;
const Directmesseges = styled.div`
font-size: 15px;
    padding: 3px;
    box-sizing: border-box;
    padding-left: 5px;
    transition: all ease-in-out 1s;
    display: ${props => props.close ? 'none' : 'relative'};
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
   transition: all ease-in-out 1s;
   display: ${props => props.close ? 'none' : 'relative'};
   @media  only screen  and (max-width:450px) {
     font-size: 16px;
     margin: 7px;
    }
`
const SideBarHeader = styled.div`
  overflow-y: hidden;
  margin: 0;
  position: relative;
  width: 100%;
  border-top:solid .5px #6e6969;
  border-bottom: solid .5px #6e6969;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 50px;
  color: #fff;
  transition: all ease-in-out 1s;
  display: ${props => props.close ? 'none' : 'relative'};
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
  position: relative;
  transition: all ease-in-out 1s;
  width: ${props => props.close ? '0' : '30%'};
  height: 100%;
  z-index: 901;
  padding-top: 50px;
  background-color: var(--slack-color);
  .close{
    position: absolute;
    color: black;
    width: 30px;
    height: 30px;
    bottom: 50%;
    right: -30px;
    cursor: pointer;
  }
`
const AddChannelContainer = styled.div`
margin-top: 30px;
     display: flex;
     align-items: center;
     justify-content: space-between;
     font-size: 16px;
     color: white;
     cursor: pointer;
      transition: all ease-in-out 1s;
      display: ${props => props.close ? 'none' : 'relative'};
      span{
        display: flex;
        align-items: center;
      }
     svg{
  @media  only screen  and (max-width:450px) {
       font-size: 10px;
    }
}
    `
const Svg = styled.span`
       margin-right: 5px;
       cursor: pointer;
    `