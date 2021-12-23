import './App.css';
import Home from './components/Home';
import {useState,useEffect} from 'react';
import Login from './components/Login';



function App() {
  const [isLoggedIn,inAndOut] = useState(false);

  

  const LoginAndOut = ()=>(
    inAndOut(!isLoggedIn)
  )
  
  if(isLoggedIn){
    return <Home id={4} logoutFunction = {LoginAndOut}/>
  }
  else{
    return <Login loginFunction = {LoginAndOut}/>
  }
}


export default App;
