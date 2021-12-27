import axios from 'axios';
import {useEffect, useState} from 'react';

function Comments(props) {
  const[CommentContent,setComment] = useState(null) 
  const URL='http://localhost:8080/comments/' + props.pid

  useEffect(()=>
  axios.get(URL).then(res=>{setComment(res.data)}).catch(err=>console.log(err))
  )
  
  const deleteComment=(id)=>{
    var url = 'http://localhost:8080/comments/'+id.toString()
    axios.delete(url,{data:{}}).catch(err=>console.log(err))
  }

  const increaselikes=(id,likesCount)=>{
    var url = 'http://localhost:8080/comments/' + id.toString()
    axios.put(url,{
      "likesCount" : likesCount+1
    }).catch(err=>console.log(err))
  }

  if(CommentContent === null){
    return (
      <div>
        <p>No Comments</p>
      </div>
    )
  }

  return (
      <div>
        {CommentContent.map((Title)=>(props.uid!==Title.author?(
          <div key={Title.cid}>
            <p>{Title.description}</p>
            <p>{Title.likesCount}</p>
            <button>Edit</button>
            <button onClick={()=>increaselikes(Title.cid)}>like</button>
          </div>):
          
          (<div key={Title.cid}>
          <p>{Title.description}</p>
          <p>{Title.likesCount}</p>
          <button>Edit</button>
          <button onClick={()=>deleteComment(Title.cid,Title.likesCount)}>delete</button>
          </div>)
        ))}
      </div>
    );
  } 
  
export default Comments;