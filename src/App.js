import './App.css';
import React ,{useEffect}from 'react';
import {Routes,Route,useNavigate} from 'react-router-dom';
import Header from './components/Header';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat'
import {useAuthState} from 'react-firebase-hooks/auth';
import { auth } from './components/Firebase';
import Login from './components/Login';
import Loading from './Loading';
function App() {
  const [user,loading] = useAuthState(auth)
  const navigate = useNavigate();
  useEffect(() => {
    if (window.location.pathname !== '/') {
      navigate('/');
    }
  }, []);
  if(loading) {
    return <Loading/>
  }
    return (
      <>
       {!user ? (
         <Login/>
       ) : (
         <>
         <Container>
          <Header/>
          <Sidebar/>
          <Routes> 
           <Route path='/:id' element={<Chat/>}>
           </Route>
         </Routes>
         </Container>
         </>
       )}
       </>
   );
}

export default App;
const Container = styled.div`
position: relative;
  width:100%;
  height: 100vh;
`