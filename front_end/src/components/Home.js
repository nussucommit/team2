import Posts from "./Posts";
import Post from "./Post"
import CreatePost from "./CreatePost";
import CreateComment from "./CreateComment";
import EditPost from "./EditPost";
import EditComment from "./EditComment"


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function Home(props) {
    const userWelcome = "Welcome User " + props.id +"!"
    
    const CreatePostURL = "/CreatePost" 

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

        </Switch>
        </div>
      </div>
      </Router>
      
    )
  }
  
  export default Home;