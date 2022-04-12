import React,{ useState, useEffect } from 'react'
import SinglePost from '../SinglePost/SinglePost'

const FollowingsPosts  = ()=>{
    const [data,setData] = useState([])

    useEffect(()=>{
        fetch('/getsubpost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setData(result.posts)
        })
    },[])

    return (
        <div className="home">
        {
            data.map(item=>{
                return(
                    <SinglePost item={item} setData={setData} data={data}/>
                )
            })
        } 
        </div>
    )
}


export default FollowingsPosts;