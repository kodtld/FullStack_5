const LoginForm = ({
    handleLogin,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password,
   }) => {
    return (
        <div>
       
          <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
            <div>
              username
                <input id="username"
                type="text"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div>
              password
                <input id="password"
                type="password"
                value={password}
                name="Password"
                onChange={handlePasswordChange}
              />
            </div>
            <button id="login-button" type="submit">login</button>
          </form>      
        </div>
      )
 }
 
 export default LoginForm