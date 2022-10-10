import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/loginForm'
import AddBlogForm from './components/addBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([]) 
  const [errorMessage, setErrorMessage] = useState(null)
  const [notifStatus, setNotifStatus] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const [newBlogVisible, setNewBlogVisible] = useState(false)

  useEffect(() => {
      blogService.getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
    
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // ...

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')

    } 
    
    catch (exception) {
      console.log("naa")
      setNotifStatus("red")
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }
  }


  const handleUsernameChange = event => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const handleTitleChange = event => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = event => {
      setAuthor(event.target.value)
  }

  const handleUrlChange = event => {
      setUrl(event.target.value)
  }

  const handleLogout = (event) =>{
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const addBlog = (event) =>{
    event.preventDefault()
    
    const newBlog = {
      title:  title,
      author: author,
      url: url,
      likes: 0
  }
    blogService
      .create(newBlog)    
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotifStatus("green")
        setErrorMessage(`${returnedBlog.title.toString()} added to blogs`)
        setTimeout(() => {
            setNotifStatus('')
            setErrorMessage(null)
            setTitle('')
            setAuthor('')
            setUrl('')
        }, 4000)
      })
      .catch(error => {
        setNotifStatus("red")
        setErrorMessage(error.response.data)
        setTimeout(() => {
            setNotifStatus('')
            setErrorMessage(null)
        }, 4000)
      })
  
    }

    const loginForm = () => {
      const hideWhenVisible = { display: loginVisible ? 'none' : '' }
      const showWhenVisible = { display: loginVisible ? '' : 'none' }
  
      return (
        <div>
          <h1>Blog App</h1>
          <div style={hideWhenVisible}>
            <button onClick={() => setLoginVisible(true)}>log in</button>
          </div>
          <div style={showWhenVisible}>
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleLogin={handleLogin}
            />
            <button onClick={() => setLoginVisible(false)}>cancel</button>
          </div>
        </div>
      )
    }

    const addBlogForm = () => {
      const hideWhenVisible = { display: newBlogVisible ? 'none' : '' }
      const showWhenVisible = { display: newBlogVisible ? '' : 'none' }
  
      return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={() => setNewBlogVisible(true)}>Add new blog</button>
          </div>
          <div style={showWhenVisible}>
            <AddBlogForm
              title={title}
              author={author}
              url={url}
              handleTitleChange={({ target }) => setTitle(target.value)}
              handleAuthorChange={({ target }) => setAuthor(target.value)}
              handleUrlChange={({ target }) => setUrl(target.value)}
              addBlog={addBlog}
            />
            <button onClick={() => setNewBlogVisible(false)}>Cancel</button>
          </div>
        </div>
      )
    }

  if (user === null) {
    return (
      loginForm()
    )
  }

  
  return (
    <div>
      <Notification message={errorMessage} notifStatus={notifStatus}/>
      <p><strong>{user.username}</strong> logged in, Welcome!</p>
      <form onSubmit={handleLogout}>
        <button type='submit'>Logout</button>
      </form>< br/>
      <h2>Blogs:</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      {addBlogForm()}
    </div>
  )
  }

export default App