import { useUsers, useUsersActions } from '../stores/usersStore'
import { useEffect } from 'react'

const UserList = () => {
  const users = useUsers()
  const { initializeUsers } = useUsersActions()

  const tableStyle = {
    padding: '20px',
    borderCollapse: 'collapse',
  }

  const cellStyle = {
    padding: '15px',
    textAlign: 'left',
    borderBottom: '1px solid',
  }

  useEffect(() => {
    initializeUsers()
  }, [initializeUsers])

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
              <td style={cellStyle}>{user.name}</td>
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
