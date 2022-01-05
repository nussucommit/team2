import Posts from "./Posts";
import Post from "./Post"
import CreatePost from "./CreatePost";
import CreateComment from "./CreateComment";
import EditPost from "./EditPost";
import EditComment from "./EditComment"
import SearchByAuthor from "./SearchByAuthor"
import { useEffect, useState} from 'react';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function Home(props) {
    const userWelcome = "Welcome User " + props.id +"!"
    
    const CreatePostURL = "/CreatePost" 
    const [CurrentSearch,changeSearchType] = useState('author')
    const [SearchContent,changeSearchContent] = useState('')

    const onChange = (e)=>(changeSearchType(e.target.value))
    const changeSearch = (e)=>(changeSearchContent(e.target.value))

    return (
      <Router>
      <div className = 'backgroundColor'>
        <div className = 'top'>

        <div className='navigationbar'>
        <div>
        <Link to="/" className='primary'>Our blog</Link>
        </div>
  
        <div className='navigationButtonsPosition'>
        <Link to = {CreatePostURL} className='navigationButtons'>New Post</Link>
        </div>

        <div className='navigationButtonsPosition'>
        <Link to = "/" onClick={props.logoutFunction} className='navigationButtons'>Logout</Link>
        </div>
        <div className='navigationButtonsPosition'>
        <select onChange={onChange} defaultValue="author">
        <option value="content">Content</option>
        <option value="author">Author</option>
        </select>
        </div>
        <div className='navigationButtonsPosition'>
        <input type="text" onChange={changeSearch}></input>
        </div>
        <div className='navigationButtonsPosition'>
        <Link to = {"/author/"+"?name="+SearchContent}><button>Search</button></Link>
        </div>

        <p>{CurrentSearch}</p>
        
        
        </div>

        <div>
        <p>{userWelcome}</p>
        </div>
        </div>
        

        <div className='body'>
        <Switch>
            <Route exact path="/">
                <Posts id={props.id}/>
            </Route>

            <Route exact path ="/CreatePost">
                <CreatePost id = {props.id}/>
            </Route>

            <Route exact path ="/ClickedPost/:pid">
                <Post uid={props.id}/>
            </Route>

            <Route exact path ="/CreateComment/:pid">
                <CreateComment uid={props.id}/>
            </Route>

            <Route exact path ="/EditPost/:pid">
                <EditPost uid={props.id}/>
            </Route>

            <Route exact path ="/EditComment/:cid">
                <EditComment uid={props.id}/>
            </Route>

            <Route exact path ="/author/">
                <SearchByAuthor id={props.id}/>
            </Route>

        </Switch>
        </div>
      </div>
      </Router>
      
    )
  }
  
  export default Home;