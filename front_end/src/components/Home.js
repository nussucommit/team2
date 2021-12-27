import { Prompt } from "react-router-dom/cjs/react-router-dom.min";
import Posts from "./Posts";
import Post from "./Post"
import CreatePost from "./CreatePost";
import CreateComment from "./CreateComment";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function Home(props) {
    
    const CreatePostURL = "/CreatePost" 
    
  
  
    return (
      <Router>
      <div>
        <Link to="/">Our blog</Link>
       
        
        <div>
          <Link to = {CreatePostURL}> CreatePost</Link>
        </div>

        <div>
          <Link to = "/" onClick={props.logoutFunction}>Logout</Link>
        </div>



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
        </Switch>
      </div>
      </Router>
      
    )
  }
  
  export default Home;