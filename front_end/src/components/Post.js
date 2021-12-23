import Comments from './Comments'
import {useParams} from "react-router-dom"
import axios from 'axios';
import { useEffect, useState} from 'react';


function Post(props) {
    
  const {pid} = useParams()
  const URL = "http://localhost:8080/posts/" + pid
  const LikeURL = "http://localhost:8080/posts/likes/"+pid
  
  const[PostDetails,setPost] = useState(null) 

  useEffect(()=>
  axios.get(URL).then(res=>{setPost(res.data)}).catch(err=>console.log(err))
  )

  const likePost = (()=>
  axios.put(LikeURL,{
    "likesCount":PostDetails.likesCount+1
  }).catch(err=>console.log(err)))

  if(PostDetails == null){
    return (
      <div>
        <p>The Post does not exist</p>
      </div>
    )
  }

  if(props.uid == PostDetails.createdBy){
  
  
  
    return (
      <div>
          <h1>{PostDetails.title}</h1>
          <p>{PostDetails.description}</p> 
          <p>{PostDetails.likesCount}</p>
          <Comments author='John'/>   
      </div>
    );
  }
  
  return (
  <div>
      <h1>{PostDetails.title}</h1>
      <p>{PostDetails.description}</p> 
      <p>{PostDetails.likesCount}</p>
      <button onClick={likePost}>Like the post</button>
      <Comments author='John'/>   
  </div>
  );
}
export default Post;