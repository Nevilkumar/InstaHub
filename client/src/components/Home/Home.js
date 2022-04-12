import React,{ useState, useEffect } from 'react'
import './Home.css'

import SinglePost from '../SinglePost/SinglePost'

const Home  = ()=>{
    const [data,setData] = useState([])

    useEffect(()=>{
        fetch('/allpost',{
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
                data && data.map(item => {
                    return(
                        <SinglePost item={item} setData={setData} data={data}/>
                    )
                })
           } 
          
          
        </div>
    )
}


export default Home