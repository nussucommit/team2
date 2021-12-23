import {  
  Link
} from "react-router-dom";

function Login(props) {
  return (
    <div>
        <h1>This is the Login page</h1>
        <div>
            <label >Username:</label>
            <input type="text" id="username" name="username"></input> 
        </div>

        <div>
            <label >Password (8 characters minimum):</label>
            <input type="password" id="pass" name="password" minLength="8" required></input>
         </div>

         <button onClick={props.loginFunction}>Login</button>
        
    </div>
  );
}

export default Login;