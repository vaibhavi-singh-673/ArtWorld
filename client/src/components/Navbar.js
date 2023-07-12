import React,{useContext,useRef,useEffect,useState} from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css'

const NavBar = ()=>{
  const searchModal = useRef(null)
  const [search,setSearch] = useState('')
  const [userDetails,setUserDetails] = useState([])
  const {state,dispatch} = useContext(UserContext)
  const navigate = useNavigate()
  useEffect(()=>{
     M.Modal.init(searchModal.current)
  },[])
   const renderList = ()=>{
     if(state){
        return [
            <li  key="5">
              <button className="btn #e53935 red darken-1"
            onClick={()=>{
              localStorage.clear()
              dispatch({type:"CLEAR"})
              navigate('/enter')
            }}
            >
                Exit
            </button>
            </li>,
            <li key="1"><Link to="/artifacts">Artifacts</Link></li>,
            <li key="2"><Link to="/addartifact">Add Artifact</Link></li>,
            <li key="3"><Link to="/myfollowingpost">My following Posts</Link></li>,
            <li key="4"><i data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>
      
         
        ]
     }else{
      return [
       <li  key="6"><Link to="/enter">Enter</Link></li>,
       <li  key="7"><Link to="/register">Register</Link></li>
      
      ]
     }
    }

    const fetchUsers = (query)=>{
      setSearch(query)
      fetch('/search-users',{
        method:"post",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          query
        })
      }).then(res=>res.json())
      .then(results=>{
        setUserDetails(results.user)
      })
   }
  

    return(
    <nav>
     <div className="nav-wrapper">
      <Link to={state?"/":"/enter"} className="brand-logo right">ArtWorld</Link>
      <ul id="nav-mobile" className="left">
         {renderList()}
      </ul>
     </div>
        <div id="modal1" className="modal" ref={searchModal}>
          <div className="modal-content"  style={{color:"black"}} >
            <input
                type="text"
                placeholder="search users"
                value={search}
                onChange={(e)=>fetchUsers(e.target.value)}
            />
                <ul className="collection">
                    {userDetails.map(item=>{
                    return <Link to={item._id !== state._id ? "/artifacts/"+item._id:'/artifacts'} onClick={()=>{
                      M.Modal.getInstance(searchModal.current).close()
                      setSearch('')
                    }}><li className="collection-item">{item.email}</li></Link> 
                    })}
                </ul>
          
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</button>
          </div>
        </div>
    </nav>
    )
    

}

export default NavBar