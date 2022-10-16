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
            <div><p>Title: </p><input id="title" name="title" value={title} onChange={handleTitleChange}/></div>
            <div><p>Author: </p><input id="author" name="author" value={author} onChange={handleAuthorChange}/></div>
            <div><p>URL: </p><input id="url" name="url" value={url} onChange={handleUrlChange}/></div>
            < br/><button id="create-button" type="submit">Submit new blog</button>
        </form>
    </div>
      )
 }
 
 export default AddBlogForm