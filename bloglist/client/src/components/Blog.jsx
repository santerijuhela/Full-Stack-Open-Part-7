import { useState } from 'react'
import { useBlogs, useBlogActions } from '../stores/blogStore'
import { useNotificationActions } from '../stores/notificationStore'
import { useUser } from '../stores/userStore'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material'

const Blog = () => {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [comment, setComment] = useState('')
  const id = useParams().id
  const navigate = useNavigate()
  const blogs = useBlogs()
  const { addLike, addComment, removeBlog } = useBlogActions()
  const setNotification = useNotificationActions()
  const blog = blogs.find((blog) => blog.id === id)
  const currentUser = useUser()

  if (!blog) {
    return null
  }

  const canBeRemoved = () =>
    currentUser && currentUser.username === blog.user.username

  const handleRemove = async () => {
    try {
      await removeBlog(blog)
      setConfirmOpen(false)
      setNotification(`Blog ${blog.title} by ${blog.author} removed`)
      navigate('/')
    } catch (error) {
      setNotification('Error while trying to delete blog', true)
      console.log('Error while trying to delete blog', error)
    }
  }

  const handleLike = async () => {
    try {
      await addLike(blog)
    } catch (error) {
      setNotification('Error while trying to like the blog', true)
      console.log('Error while trying to like the blog', error)
    }
  }

  const handleComment = async (event) => {
    event.preventDefault()
    try {
      await addComment(blog, comment)
      setComment('')
    } catch (error) {
      setNotification('Adding comment failed', true)
      console.log('Adding comment failed', error)
    }
  }

  return (
    <Card sx={{ mt: 2, maxWidth: 600 }} className="blog">
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {blog.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          by {blog.author}
        </Typography>

        <Link
          href={blog.url}
          target="_blank"
          rel="noopener"
          display="block"
          sx={{ mb: 1 }}
        >
          {blog.url}
        </Link>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Added by {blog.user.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
          <Typography variant="body1">{blog.likes} likes</Typography>
          {currentUser && (
            <Button size="small" variant="outlined" onClick={handleLike}>
              like
            </Button>
          )}
          {canBeRemoved() && (
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={() => setConfirmOpen(true)}
            >
              remove
            </Button>
          )}
        </Box>
        <div>
          <h3>comments</h3>
          <form onSubmit={handleComment}>
            <input
              type="text"
              onChange={({ target }) => setComment(target.value)}
            />
            <button type="submit">add comment</button>
          </form>
          <ul>
            {blog.comments.map((comment, index) => (
              <li key={`${blog.id}-${index}`}>{comment}</li>
            ))}
          </ul>
        </div>
      </CardContent>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Remove blog</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Remove blog <strong>{blog.title}</strong> by {blog.author}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>cancel</Button>
          <Button onClick={handleRemove} color="error" variant="contained">
            remove
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default Blog
