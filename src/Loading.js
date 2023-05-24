import React from 'react'
import img from './images/slack.jpg'
import styled from 'styled-components';
//import { Spinner } from 'react-spinkit';
const Loading = () => {
    let Spinner = require('react-spinkit');
  return (
    <AppLoading>
        <AppLoadingContent>
        <img src={img} width={400} height={200} alt='spinner'/>
        <Spinner
            name='ball-spin-fade-loader'
            color='purple'
            fadeIn='none'
        />
        </AppLoadingContent>
    </AppLoading>
  )
}

export default Loading
const AppLoadingContent = styled.div`
   width: 400px;
   height: 400px;
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   align-items: center;

`
const AppLoading = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`