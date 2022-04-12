import React,{useState,useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'
import './CreatePost.css';


const CretePost = ()=>{
    const history = useHistory()
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")

    useEffect(()=>{
       if(url){
        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                body,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error,classes:"toast-div-red"})
            }
            else{
                M.toast({html:"Post Created Successfully",classes:"toast-div-green"})
                history.push('/')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    },[url])
    
   
    const postDetails = ()=>{
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
 

    return(
        <div className="create-post-div">
            <input 
                type='text' 
                className='input-class' 
                placeholder='Title' 
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
            />
            <input 
                type='text' 
                className='input-class' 
                placeholder='Body'
                value={body}
                onChange={(e)=>setBody(e.target.value)} 
            />
            <div className="auth-btn-pic">
                <span className='upload-span-pic'>Upload Photo</span>
                <input type="file" className='upload-input-pic' onChange={(e)=>setImage(e.target.files[0])} />
            </div>
            <button type='submit' className='post-submit-btn' onClick={()=>postDetails()}>Submit Post</button>
        </div>
    )
}


export default CretePost