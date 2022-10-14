import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AddBlogForm from './addBlogForm'
import userEvent from '@testing-library/user-event'

test('<addBlogForm /> updates parent state and calls onSubmit', async () => {
    const handleAddBlog = jest.fn(e => e.preventDefault());
    const user = userEvent.setup()

    render(<AddBlogForm addBlog={handleAddBlog} />)

    const title = screen.getByText('Title:')
    const author = screen.getByText('Author:')
    const url = screen.getByText('URL:')
    const sendButton = screen.getByText('Submit new blog')

    await user.type(title, 'testblog')
    await user.type(author, 'testblog')
    await user.type(url, 'testblog')
    await user.click(sendButton)

    expect(handleAddBlog.mock.calls).toHaveLength(1)
})