import { useParams, Link } from 'react-router-dom'
import { useUsers } from '../stores/usersStore'
import {
  Avatar,
  Box,
  Chip,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material'

const User = () => {
  const id = useParams().id
  const users = useUsers()
  const user = users.find((u) => u.id === id)

  if (!user) {
    return null
  }

  return (
    <Box sx={{ py: 4, maxWidth: 700 }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Avatar sx={{ width: 56, height: 56 }}>
          {user.name.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="h4">{user.name}</Typography>
          <Chip label={`${user.blogs.length} blogs`} size="small" />
        </Box>
      </Stack>

      <Typography variant="h6" gutterBottom>
        Added blogs
      </Typography>

      <Paper variant="outlined">
        <List disablePadding>
          {user.blogs.map((blog) => (
            <ListItemButton
              key={blog.id}
              component={Link}
              to={`/blogs/${blog.id}`}
              divider
            >
              <ListItemText primary={blog.title} secondary="View blog" />
            </ListItemButton>
          ))}
        </List>
      </Paper>
    </Box>
  )
}

export default User
