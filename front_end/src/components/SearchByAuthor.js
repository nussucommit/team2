import { useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useLocation } from "react-router-dom";


function SearchByAuthor(props) {
  const[PostTitles,setPosts] = useState(null) 
  
  const query = new URLSearchParams(useLocation().search);
  const name = query.get("name");
  
  const URL = 'http://localhost:8080/posts/author/'+name


  const deletePost=(id)=>{
    var url = 'http://localhost:8080/posts/'+id.toString()
    axios.delete(url,{data:{}}).catch(err=>console.log(err)) 
  }

  useEffect(()=>
  axios.get(URL).then(res=>{setPosts(res.data)}).catch(err=>console.log(err)))

    return (
      <div className="listOfPosts">
        
        {PostTitles === null?<p>No Posts</p>: PostTitles.map((Title)=>(props.id!==Title.createdBy?(
          <div key={Title.pid} className='postTitle'>
            <Link to = {"/ClickedPost/"+Title.pid} >{Title.title}</Link>
            <p>Likes:{Title.likesCount}</p>
          </div>
          ):
          
          (<div key={Title.pid} className='postTitle'>
            <Link to = {"/ClickedPost/"+Title.pid}>{Title.title}</Link>
            <div className='buttonPadding'>
            <button onClick={()=>deletePost(Title.pid)} className="deletebutton">delete</button>
            <Link to = {"/EditPost/"+Title.pid}><button className="deletebutton"> Edit</button></Link>
            <p>Likes:{Title.likesCount}</p>
            </div>
          
          </div>) 
        ))}
        
      </div> 
    );
  } 

export default SearchByAuthor ;