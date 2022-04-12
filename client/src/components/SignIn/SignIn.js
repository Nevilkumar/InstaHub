import React,{useState,useContext,} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'
import './SignIn.css'
import { BsInstagram } from 'react-icons/bs';


const SignIn  = ()=>{
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid Email",classes:"toast-div-red"})
            return
        }
        fetch("/signin",{
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
            if(data.error){
                M.toast({html: data.error,classes:"toast-div-red"})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"Log In Successfull",classes:"toast-div-green"})
                history.push('/')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
   return (
      <div className="auth-card">
          <div>
          <p className="auth-logo"><BsInstagram className='logo-icons' />InstaHub</p>
            <input
                className='input-class' 
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />
            <input
                className='input-class' 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPasword(e.target.value)}
            />
            <button className="auth-btn" onClick={()=>PostData()}>Login</button>
            <h5 className='auth-link-div'>
                Don't have an account? <Link to="/signup" className='auth-link'>Click here</Link>
            </h5>
        </div>
      </div>
   )
}


export default SignIn