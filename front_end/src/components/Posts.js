import { useState} from 'react';
import {Link} from 'react-router-dom'


function Posts(props) {
  const[PostTitles,setPosts] = useState([
    {title: '1st post',author:'John',id: 1},
    {title: '2nd post',author:'Sam',id: 2},
    {title: '3rd post',author:'Kay',id: 3},
  ]) 

  const deletePost=(id)=>{   
    const newPosts = PostTitles.filter(post => post.id!==id)
    setPosts(newPosts);
  }     
    return (
      <div>
        <div>
          <Link to="/CreatePost">New Post</Link>
        </div>
        {PostTitles.map((Title)=>(props.author!==Title.author?(
          <div key={Title.id}>
            <Link to="/ClickedPost">{Title.title}</Link>
          </div>):
          
          (<div key={Title.id}>
            <Link to="/ClickedPost">{Title.title}</Link>
          <button onClick={()=>deletePost(Title.id)}>delete</button>
          </div>)
        ))}
        
      </div> 
    );
  } 

export default Posts;