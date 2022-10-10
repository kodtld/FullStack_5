const AddBlogForm = ({
    addBlog,
    title,
    handleTitleChange,
    author,
    handleAuthorChange,
    url,
    handleUrlChange
   }) => {
    return (
        <div>
        <h2>Create new blog</h2>
        <form onSubmit={addBlog}>
            <div><p>Title: </p><input value={title} onChange={handleTitleChange}/></div>
            <div><p>Author: </p><input value={author} onChange={handleAuthorChange}/></div>
            <div><p>URL: </p><input value={url} onChange={handleUrlChange}/></div>
            < br/><button type="submit">Submit new blog</button>
        </form>
    </div>
      )
 }
 
 export default AddBlogForm