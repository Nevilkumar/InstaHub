import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import './Signup.css'
import { BsInstagram } from 'react-icons/bs';


const SignIn  = ()=>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPasword] = useState("")
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
        data.append("upload_preset","instahub")
        data.append("cloud_name","dbcy4xzb9")
        fetch("https://api.cloudinary.com/v1_1/dbcy4xzb9/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const uploadFields = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid Email",classes:"toast-div-red"})
            return
        }
        fetch("/signup",{
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
                M.toast({html: data.error,classes:"toast-div-red"})
            }
            else{
                M.toast({html: data.message,classes:"toast-div-green"})
                history.push('/signin')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    const PostData = ()=>{
        if(image){
            uploadPic()
        }else{
            uploadFields()
        }
       
    }

   return (
      <div className="auth-card">
          <div>
            <p className="auth-logo"><BsInstagram className='logo-icons' />InstaHub</p>
            <input
                className='input-class' 
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />
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
            <div className="auth-btn-pic">
                <span className='upload-span-pic'>Upload Photo</span>
                <input type="file" className='upload-input-pic' oonChange={(e)=>setImage(e.target.files[0])} />
            </div>
            <button className="auth-btn" onClick={()=>PostData()}>Sign Up</button>
            <h5 className='auth-link-div'>
                Already have an account? <Link to="/signin" className='auth-link'>Click here</Link>
            </h5>
    
        </div>
      </div>
   )
}


export default SignIn