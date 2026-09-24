import { useEffect } from 'react'

import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'

import { Container, AppBar, Toolbar, Button, Typography } from '@mui/material'

import BlogList from './components/BlogList'
import Login from './components/Login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'

import Notification from './components/Notification'
import ErrorBoundary from './components/ErrorBoundary'
import { useBlogActions } from './stores/blogStore'
import { useUser, useUserActions } from './stores/userStore'

const App = () => {
  const { initialize } = useBlogActions()
  const { initializeUser, logout } = useUserActions()
  const user = useUser()

  const navigation = useNavigate()
  const location = useLocation()

  useEffect(() => {
    initialize()
  }, [initialize])

  useEffect(() => {
    initializeUser()
  }, [initializeUser])

  const handleLogout = async () => {
    logout()
    navigation('/')
  }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Blog App
          </Typography>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
          >
            blogs
          </Button>
          {!user ? (
            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
            >
              login
            </Button>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/create"
                sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
              >
                new blog
              </Button>
              <Button
                color="inherit"
                onClick={handleLogout}
                sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
              >
                logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Notification />

      <ErrorBoundary key={location.key}>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<BlogForm />} />
          <Route path="/*" element={<h1>404 - Page not found</h1>} />
        </Routes>
      </ErrorBoundary>
    </Container>
  )
}

export default App
