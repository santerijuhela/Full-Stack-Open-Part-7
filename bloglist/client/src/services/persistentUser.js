const getUser = () => {
  const user = window.localStorage.getItem('loggedBlogappUser')
  return user ? JSON.parse(user) : null
}

const saveUser = (user) => {
  window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
}

const removeUser = () => {
  window.localStorage.removeItem('loggedBlogappUser')
}

export default { getUser, saveUser, removeUser }
