import React,{useState,useContext,} from "react";
import {Link,useNavigate} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'

const Signin = ()=>{
  const {state,dispatch} = useContext(UserContext)
  const navigate =useNavigate()
  const [password,setpasword] = useState("")
  const [email,setEmail] = useState("")
  const PostData =()=>{
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
       M.toast({html: "Invalid email ",classes:"#c62828 red darken-3"})
       return
    }

    fetch("/enter",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        password,
        email
      })
    }).then(res=>res.json())
    .then(data=>{
      console.log(data)
      if(data.error){
        M.toast({html: data.error,classes:"#c62828 red darken-3"})
      }
      else{
        localStorage.setItem("jwt",data.token)
        localStorage.setItem("user",JSON.stringify(data.user))
        dispatch({type:"USER",payload:data.user})
        M.toast({html: "Entered",classes:"#00c853 green accent-4"})
        navigate('/')
      }
    }).catch(err=>{
        console.log(err)
    })
  }
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
               <h2>ArtWorld</h2>
              <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              />
              <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setpasword(e.target.value)}
              />
              <button className="btn waves-effect waves-light #42a5f5 blue darken-1"
              onClick={()=>PostData()}
              >
                Enter
              </button>
              <h6>
                <Link to="/register">Don't have a account ?</Link>
              </h6>
              <h6>
                <Link to="/reset">Forgot password ?</Link>
              </h6>
            </div>
        </div>
    )
}

export default Signin