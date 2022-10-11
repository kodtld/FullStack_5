import { useState } from "react"

const Blog = ({ blog, updateBlog, removeBlog}) => {
  const [more,setMore] =useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (more === true){  return (
    <div style={blogStyle}>
      <div> 
        Title: {blog.title} < br/> 
        Author: {blog.author} < br/>
        URL: {blog.url} < br/>
        Likes: {blog.likes} <button onClick={() => updateBlog(blog.id)}>Like</button> < br/>
        <button onClick={() => setMore(false)}>Hide</button> < br/>
        <button onClick={() => removeBlog(blog.id)}>Remove blog</button>
      </div>
  </div>
  )}

  if (more === false){  return (
    <div style={blogStyle}>
      <div> 
        Title: {blog.title} < br/>
        Author: {blog.author} < br/>
        <button onClick={() => setMore(true)}>Show more</button>
      </div>
  </div>
  )}
}
export default Blog