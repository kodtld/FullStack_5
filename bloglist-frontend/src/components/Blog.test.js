import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import App from '../App'
import userEvent from '@testing-library/user-event'

test('renders content', () => {
  const blog = {
    Title: "Hevon Harjat",
    Author: "Salli Mustonen",
    URL: "www.hevonharjat.com",
    Likes: 4000,
    id:123
  }

  render(<Blog title={blog.Title} author={blog.Author} url={blog.URL} likes={blog.Likes} id={blog.id} updateBlog={App.updateBlog} removeBlog={App.removeBlog} />)

  const title = screen.getByText('Title: Hevon Harjat Author: Salli Mustonen')
  expect(title).toBeDefined()

})


test('renders full info after "Show more" button press', async () => {
    const blog = {
        Title: "Hevon Harjat",
        Author: "Salli Mustonen",
        URL: "www.hevonharjat.com",
        Likes: 4000,
        id:123
      }

    render(<Blog title={blog.Title} author={blog.Author} url={blog.URL} likes={blog.Likes} id={blog.id} updateBlog={App.updateBlog} removeBlog={App.removeBlog} />)

    const user = userEvent.setup()
    const morebutton = screen.getByText('Show more')
    await user.click(morebutton)


    const title = screen.getByText('Title: Hevon Harjat Author: Salli Mustonen URL: www.hevonharjat.com Likes: 4000')
    expect(title).toBeDefined()
  
})

test('clicking the like-button twice == two calls for eventhandler', async () => {
    const blog = {
        Title: "Hevon Harjat",
        Author: "Salli Mustonen",
        URL: "www.hevonharjat.com",
        Likes: 4000,
        id:123
      }

    const mockHandler = jest.fn()

    render(
        <Blog blog={blog} updateBlog={mockHandler} />
    )

    const user = userEvent.setup()
    const morebutton = screen.getByText('Show more')
    await user.click(morebutton)
    const button = screen.getByText('Like')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
})