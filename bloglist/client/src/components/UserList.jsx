import { useUsers, useUsersActions } from '../stores/usersStore'
import { Link } from 'react-router-dom'

const UserList = () => {
  const users = useUsers()

  const tableStyle = {
    padding: '20px',
    borderCollapse: 'collapse',
  }

  const cellStyle = {
    padding: '15px',
    textAlign: 'left',
    borderBottom: '1px solid',
  }

  return (
    <div>
      <h2>Users</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={cellStyle}>Name</th>
            <th style={cellStyle}>Username</th>
            <th style={cellStyle}>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={cellStyle}>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td style={cellStyle}>{user.username}</td>
              <td style={cellStyle}>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
