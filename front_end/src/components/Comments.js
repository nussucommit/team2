import { useState} from 'react';

function Comments(props) {
  const[CommentContent,setComment] = useState([
    {content: '1st comment',author:'John',id: 1,likes:0},
    {content: '2nd comment',author:'Sam',id: 2,likes:0},
    {content: '3rd comment',author:'Kay',id: 3,likes:0},
  ]) 

  const deletePost=(id)=>{   
    const newPosts = CommentContent.filter(post => post.id!=id)
    setComment(newPosts);
  }
  
  const increaselikes=(id)=>{
    const newPosts = CommentContent.map(comment=>comment.id == id?{content:comment.content,author:comment.author,id:comment.id,likes:(comment.likes+1)}:{content:comment.content,author:comment.author,id:comment.id,likes:(comment.likes)})
    setComment(newPosts);
  }
  return (
      <div>
        {CommentContent.map((Title)=>(props.author!==Title.author?(
          <div key={Title.id}>
            <p>{Title.content}</p>
            <p>{Title.likes}</p>
            <button onClick={()=>increaselikes(Title.id)}>like</button>
          </div>):
          
          (<div key={Title.id}>
          <p>{Title.content}</p>
          <p>{Title.likes}</p>
          <button>Edit</button>
          <button onClick={()=>deletePost(Title.id)}>delete</button>
          </div>)
        ))}
      </div>
    );
  } 
  
export default Comments;