import { useState } from "react"

const Blog = ({ title,author,url,likes,id, updateBlog, removeBlog}) => {
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
        Title: {title} < br/> 
        Author: {author} < br/>
        URL: {url} < br/>
        Likes: {likes} <button onClick={() => updateBlog(id)}>Like</button> < br/>
        <button onClick={() => setMore(false)}>Hide</button> < br/>
        <button onClick={() => removeBlog(id)}>Remove blog</button>
      </div>
  </div>
  )}

  if (more === false){  return (
    <div style={blogStyle}>
      <div> 
        Title: {title} < br/>
        Author: {author}
        <button onClick={() => setMore(true)}>Show more</button>
      </div>
  </div>
  )}
}
export default Blog