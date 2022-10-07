import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

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

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} notifStatus={notifStatus}/>
        <h2>Log in to application</h2>
          <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>      
      </div>
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
      <div>
        <h2>Create new blog</h2>
        <form onSubmit={addBlog}>
        <div><p>Title: </p><input value={title} onChange={handleTitleChange}/></div>
        <div><p>Author: </p><input value={author} onChange={handleAuthorChange}/></div>
        <div><p>URL: </p><input value={url} onChange={handleUrlChange}/></div>
        < br/><button type="submit">Submit new blog</button>
    </form>
      </div>
    </div>
  )
  }

export default App