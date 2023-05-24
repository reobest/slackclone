import React from 'react'
import styled from 'styled-components'
import SlackImg from '../images/slack.jpg'
import { signInWithPopup } from 'firebase/auth'
import { GoogleAuthProvider } from "firebase/auth";
import { auth } from './Firebase';
const Login = () => {
    const style = {
        marginTop: "10px",
        color: "#fff",
        borderRadius: "3px",
        padding: "8px 5px",
        fontSize: "10px",
        border: "none",
        background:"#34A853",
        cursor: "pointer",
    }
    const signIn = (e) => {
       const provider = new GoogleAuthProvider()
       provider.setCustomParameters({
        prompt:'select_account'
       })
       e.preventDefault()
       signInWithPopup(auth,provider).catch((error) => console.log(error))
    }
  return (
    <LoginContainer>
        <LoginInnerContainer>
            <img className='img' width={200} height={100} src={SlackImg} alt='userImage'/>
            <h1>Sign In to Reo Community</h1>
            <p>page.slack.com</p>
            <button style={style} onClick={signIn}>
                Sign in with Google
            </button>
        </LoginInnerContainer>
    </LoginContainer>
  )
}
export default Login
const LoginContainer = styled.div`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #f7f7f7;
`
const LoginInnerContainer = styled.div`
    box-shadow: 1px 1px 1px #857d7d;
    display: flex;
    width: 50%;
    height: 350px;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    flex-direction: column;
    background-color: #fff;
    @media  only screen  and (max-width:450px) {
        width: 70%;
        >p{
            font-size: 12px;
        }
        >h1{
            font-size: 15px;
        }
    }
    >p{
        margin: 5px
    }
    >h1{
        margin-bottom: 0;
    }
`