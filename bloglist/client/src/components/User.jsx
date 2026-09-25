import { useParams } from 'react-router-dom'
import { useUsers } from '../stores/usersStore'

const User = () => {
  const id = useParams().id
  const users = useUsers()
  const user = users.find((u) => u.id === id)

  const liStyle = {
    marginLeft: '30px',
  }

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {user.blogs.map((blog) => (
        <li key={blog.id} style={liStyle}>
          {blog.title}
        </li>
      ))}
    </div>
  )
}

export default User
