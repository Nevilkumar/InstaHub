import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'
import './UserProfile.css'

const Profile  = () => {
    const [userProfile,setProfile] = useState(null)
    
    const {state,dispatch} = useContext(UserContext)
    const {userid} = useParams()
    const [showfollow,setShowFollow] = useState(state?!state.following.includes(userid):true)

    useEffect(() => {
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
                setProfile(result)
        })
    },[])


    const followUser = ()=>{
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
        
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState) => {
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]
                    }
                }
            })
            setShowFollow(false)
        })
    }
    
    const unfollowUser = ()=>{
        fetch('/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res => res.json())
        .then(data => {
            
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
        
            setProfile((prevState)=>{
            const newFollower = prevState.user.followers.filter(item=>item != data._id )
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:newFollower
                    }
                }
            })
            setShowFollow(true)
             
        })
    }
    return (
       <>
        {userProfile ?
        <div className='userprofile-div'>
            <div className='profile-top-section'>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                    src={userProfile.user.pic} />
                </div>
                <div className='profile-top-right'>
                    <h4 className='profile-name'>{userProfile.user.name}</h4>
                    <h5 className='profile-email'>{userProfile.user.email}</h5>
                    <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                        <h6 className='followings'>{userProfile.posts.length} Posts</h6>
                        <h6 className='followings'>{userProfile.user.followers.length} Followers</h6>
                        <h6 className='followings'>{userProfile.user.following.length} Following</h6>
                    </div>
                    {showfollow?
                        <button className='follow-un-btn' onClick={()=>followUser()}>Follow</button>
                    : 
                        <button className='follow-un-btn' onClick={()=>unfollowUser()}>Unfollow</button>
                    }
                </div>
            </div>
     
            <div className="gallery">
                {
                    userProfile.posts.slice(0).reverse().map(item=>{
                        return(
                            <img key={item._id} className="profile-gallery-photo" src={item.photo} alt={item.title}/>  
                        )
                    })
                }
            </div>
        </div>

        : <h2>loading...!</h2>}
       </>
    )
}


export default Profile