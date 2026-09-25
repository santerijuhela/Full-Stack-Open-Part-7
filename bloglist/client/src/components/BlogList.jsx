import { Link } from 'react-router-dom'
import { useBlogs } from '../stores/blogStore'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
} from '@mui/material'

const BlogList = () => {
  const blogs = useBlogs()
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Blogs
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
          gap: 2,
        }}
      >
        {blogs.map((blog) => (
          <Card key={blog.id} variant="outlined">
            <CardActionArea component={Link} to={`/blogs/${blog.id}`}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {blog.title}
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  by {blog.author}
                </Typography>

                <Stack direction="row" spacing={1}>
                  <Chip label={`${blog.likes} likes`} size="small" />
                  <Chip
                    label={`${blog.comments.length} comments`}
                    size="small"
                    variant="outlined"
                  />
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  )
}

export default BlogList
