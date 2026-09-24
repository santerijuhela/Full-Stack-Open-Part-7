import { create } from 'zustand'
import loginService from '../services/login'
import blogService from '../services/blogs'

const useUserStore = create((set) => ({
  user: null,
  actions: {
    initializeUser: () => {
      const storedUser = window.localStorage.getItem('loggedBlogappUser')
      const user = JSON.parse(storedUser)

      if (user) {
        blogService.setToken(user.token)
        set({ user })
      }
    },
    login: async ({ username, password }) => {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      set({ user })
    },
    logout: () => {
      window.localStorage.removeItem('loggedBlogappUser')
      set({ user: null })
    },
  },
}))

export const useUser = () => useUserStore((state) => state.user)

export const useUserActions = () => useUserStore((state) => state.actions)
