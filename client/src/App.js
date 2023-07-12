import React,{useEffect,createContext,useReducer,useContext} from 'react'
import NavBar from './components/Navbar'
import "./App.css"
import {BrowserRouter,Route,Routes,Switch,useNavigate} from 'react-router-dom';
import Home from './components/screens/Home'
import Signin from './components/screens/Signin'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import CreatePost from './components/screens/CreatePost'
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
import SubscribeUserPosts from './components/screens/SubscribeUserPosts'


export const UserContext = createContext()

const Routing = ()=>{
  const navigate =useNavigate()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
      //if(!navigate.location.pathname.startsWith('/reset'))
           navigate('/enter')
    }
  },[])
  return(
      <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route path="/enter" element={<Signin />}></Route>
      <Route path="/register" element={<Signup />}></Route>
      <Route exact path="/artifacts" element={<Profile />}></Route>
      <Route path="/addartifact" element={<CreatePost />}></Route>
      <Route path="/artifacts/:userid" element={<UserProfile />}></Route>
      <Route path="/myfollowingpost" element={<SubscribeUserPosts />}></Route>
      </Routes>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <NavBar />
    <Routing />
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
