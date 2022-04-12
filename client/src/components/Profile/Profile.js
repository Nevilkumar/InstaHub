import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import './Profile.css';


const Profile  = ()=>{
    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const [image,setImage] = useState("")

    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result);
            setPics(result.mypost)
        })
    },[])

    useEffect(()=>{
       if(image){
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","instauser")
        data.append("cloud_name","dbcy4xzb9")
        fetch("https://api.cloudinary.com/v1_1/dbcy4xzb9/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            fetch('/updatepic',{
                method:"put",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    pic:data.url
                })
            }).then(res=>res.json())
            .then(result=>{
                localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
                dispatch({type:"UPDATEPIC",payload:result.pic})
            })
        })
        .catch(err=>{
            console.log(err)
        })
       }
    },[image])

    const updatePhoto = (file)=>{
        setImage(file)
    }

    return (
        <div className='userprofile-div'>
           <div className='User-top-section'>

                <div className='user-profile-content-div'>
                    <div>
                        <img className='image-profile' src={state?state.pic:"loading"} />
                    </div>
                    <div className='profile-top-right'>
                        <h4 className='profile-name'>{state?state.name:"loading"}</h4>
                        <h5  className='profile-email'>{state?state.email:"loading"}</h5>
                        <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                            <h6 className='followings'>{mypics.length} Posts</h6>
                            <h6 className='followings'>{state?state.followers.length:"0"} Followers</h6>
                            <h6 className='followings'>{state?state.following.length:"0"} Following</h6>
                        </div>
                        <div className="upload-btn-pic">
                            <span className='upload-span-pic'>Update Photo</span>
                            <input type="file" className='upload-input-pic' onChange={(e)=>updatePhoto(e.target.files[0])} />
                        </div>
                    </div>
                </div>
            </div>      

            <div className="gallery">
                {
                    mypics && mypics.map(item=>{
                        return(
                            <img key={item._id} className="profile-gallery-photo" src={item.photo} alt={item.title}/>  
                        )
                    })
                }
            </div>
        </div>
    )
}


export default Profile