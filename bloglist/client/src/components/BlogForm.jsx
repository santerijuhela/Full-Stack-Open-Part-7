import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { TextField, Button, Stack } from '@mui/material'
import { useBlogActions } from '../stores/blogStore'
import { useNotificationActions } from '../stores/notificationStore'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const { createBlog } = useBlogActions()
  const setNotification = useNotificationActions()
  const navigate = useNavigate()

  const handleCreateNew = async (event) => {
    event.preventDefault()
    try {
      const createdBlog = await createBlog({ title, author, url })
      setNotification(
        `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
      )
      setTitle('')
      setAuthor('')
      setUrl('')
      navigate('/')
    } catch (error) {
      setNotification('Creating the blog failed', true)
      console.log('Creating new blog failed:', error)
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateNew}>
        <Stack spacing={2} sx={{ maxWidth: 400 }}>
          <TextField
            label="title"
            size="small"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <TextField
            label="author"
            size="small"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <TextField
            label="url"
            size="small"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ alignSelf: 'flex-start' }}
          >
            create
          </Button>
        </Stack>
      </form>
    </div>
  )
}

export default BlogForm
