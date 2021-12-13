function Login() {
  return (
    <div>
        <h1>This is the Login page</h1>
        <div>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username"></input> 
        </div>

        <div>
            <label for="pass">Password (8 characters minimum):</label>
            <input type="password" id="pass" name="password" minlength="8" required></input>
        </div>


        <div>
            <button>Login</button>
        </div>
        
    </div>
  );
}

export default Login;