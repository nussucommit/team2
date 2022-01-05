import Comments from './Comments'
import {useParams,Link} from "react-router-dom"
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
      <div className="post">
      <div className = "postContent">
          <h1>{PostDetails.title}</h1>
          <p>{PostDetails.description}</p> 
          <div className="postCommands">
          <p>likes: {PostDetails.likesCount}</p>
          <p>Created By {PostDetails.createdBy} at {PostDetails.createdTime.slice(0,10)}</p>
          <div className="navigationButtonsPosition">
          <Link to = {"/CreateComment/"+pid}><button>Add a Comment</button></Link>
          </div>
          </div>
          <Comments pid={pid} author={props.uid}/>   
      </div>
      </div>
    );
  }
  
  return (
  <div className="post">
    <div className = "postContent">
          <h1>{PostDetails.title}</h1>
          <p>{PostDetails.description}</p> 
          <div className="postCommands">
          <p>likes: {PostDetails.likesCount}</p>
          <p>Created By {PostDetails.createdBy} at {PostDetails.createdTime.slice(0,10)}</p>
          <div className="navigationButtonsPosition">
          <div className="CreateAndLikePost">
          <Link to = {"/CreateComment/"+pid}><button>Add a Comment</button></Link>
          <button onClick={likePost}>Like the post</button>
          </div>
          </div>
          </div>
      <Comments pid={pid} author={props.uid}/>   
      </div>
  </div>
  );
}
export default Post;