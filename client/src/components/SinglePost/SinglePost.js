import React, { useContext, useState } from 'react'
import { UserContext } from '../../App'
import { Link } from 'react-router-dom'

import './SinglePost.css'
import { AiOutlineHeart, AiFillHeart, AiOutlineDelete } from 'react-icons/ai'

const SinglePost  = ({ item, setData, data }) => {
    const { state, dispatch } = useContext(UserContext)
    const [comment, setComment] = useState("");

    const likePost = (id)=>{
        fetch('/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }

    const unlikePost = (id)=>{
        fetch('/unlike',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }

    const makeComment = (text,postId)=>{
        fetch('/comment',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
            if(item._id === result._id){
                return result
            }else{
                return item
            }
            })
        setData(newData)
        }).catch(err => {
            console.log(err)
        })
    }

    const deletePost = (postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }

    return (
        <div className="home-post-card" key={item._id}>
            <div className='post-navbar'>
                <div className='postedby-div'>
                    <img className='navbar-profile-pic' src={item.postedBy.pic} />
                    <Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile"  } className="postedby-name">{item.postedBy.name}
                    </Link>
                </div>
                {
                    item.postedBy._id === state._id 
                    && <AiOutlineDelete className='delete-icon' onClick={() => deletePost(item._id)} />
                }
            </div>

            <div className="image-card">
                <img className='post-image' src={item.photo}/>
            </div>

            <div className="card-content">
                <div className='likes-div'>
                {
                    item.likes.includes(state._id)
                    ? 
                        <AiFillHeart className='like-icon-red' onClick={()=>{unlikePost(item._id)}}/>
                    : 
                        <AiOutlineHeart className='like-icon' onClick={()=>{likePost(item._id)}}/>
                }
            
                <span className='likes-span'>{item.likes.length} Likes</span>
                </div>
                <div className='content-div'>
                    <h6 className='content-title'>{item.title}</h6>
                    <p className='content-body'>{item.body}</p>
                </div>
                {
                    item.comments.map(record=>{
                        return(
                        <h6 key={record._id} className="comment-content">
                            <span className='commentby'>{record.postedBy.name}</span> : {record.text}
                        </h6>
                        )
                    })
                }
                <form onSubmit={(e)=>{
                    e.preventDefault()
                    makeComment(comment,item._id)
                    setComment("")
                }}>
                <input type="text" value={comment} onChange = {(e) => setComment(e.target.value)}  placeholder="Add a comment" className='comment-input' />  
                </form>
                
            </div>
        </div> 
    )
}


export default SinglePost