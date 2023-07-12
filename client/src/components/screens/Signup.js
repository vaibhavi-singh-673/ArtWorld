import React,{useState,useEffect} from "react"
import {Link,useNavigate} from 'react-router-dom'
import M from 'materialize-css'
const Signup = ()=>{
      const navigate =useNavigate()
      const [name,setName] = useState("")
      const [password,setpasword] = useState("")
      const [email,setEmail] = useState("")
      const [image,setImage] = useState("")
      const [url,setUrl] = useState(undefined)
      useEffect(()=>{
        if(url){
            uploadFields()
        }
      },[url])
      const uploadPic = ()=>{
            const data = new FormData()
            data.append("file",image)
            data.append("upload_preset","artworld")
            data.append("cloud_name","vaibhavi")
            fetch("https://api.cloudinary.com/v1_1/vaibhavi/image/upload",{
                method:"post",
                body:data
            })
            .then(res=>res.json())
            .then(data=>{
                setUrl(data.url)
                // console.log(data)
            })
            .catch(err=>{
                console.log(err)
            })
      }
      const uploadFields = ()=>{
            
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
            {
              M.toast({html: "Invalid email ",classes:"#c62828 red darken-3"})
              return
            }

            fetch("/register",{
              method:"post",
              headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify({
                name,
                password,
                email,
                pic:url
              })
            }).then(res=>res.json())
            .then(data=>{
              if(data.error){
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
              }
              else{
                M.toast({html: "Registered successfully",classes:"#00c853 green accent-4"})
                navigate('/enter')
              }
            }).catch(err=>{
                console.log(err)
            })
       }

      const PostData =()=>{
        if(image){
          uploadPic()
        }else{
          uploadFields()
        }
      }

      return (
          <div className="mycard">
          <div className="card auth-card input-field">
            <h2>ArtWorld</h2>
            <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
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

              <div className="file-field input-field">
                  <div className="btn #42a5f5 blue darken-1">
                      <span>Profile Pic</span>
                      <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                  </div>
                  <div className="file-path-wrapper">
                      <input className="file-path validate" type="text" />
                  </div>
              </div>

            <button className="btn waves-effect waves-light #42a5f5 blue darken-1"
            onClick={()=>PostData()}
            >
              Register
            </button>
            <h6>
              <Link to="/enter">Already have an account ?</Link>
            </h6>
          </div>
      </div>
      )
}

export default Signup