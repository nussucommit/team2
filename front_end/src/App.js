import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Posts from './components/Posts';
import CreatePost from './components/CreatePost';
import Post from './components/Post'



function App() {
  
  return (
    <Router>
    <div>
      <h1>HomePage</h1>
      <Link to="/">Home</Link>
      
      <Switch>
      <Route exact path="/">
       <Posts author="John"/>
      </Route>
      <Route exact path="/CreatePost">
        <CreatePost/>
      </Route>
      <Route exact path="/ClickedPost">
        <Post/>
      </Route>

      </Switch>
      
    </div>
    </Router>
  );
}

export default App;
