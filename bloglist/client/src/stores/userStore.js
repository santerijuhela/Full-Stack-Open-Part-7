import { create } from 'zustand'
import loginService from '../services/login'
import blogService from '../services/blogs'
import persistentUser from '../services/persistentUser'

const useUserStore = create((set) => ({
  user: null,
  actions: {
    initializeUser: () => {
      const user = persistentUser.getUser()

      if (user) {
        blogService.setToken(user.token)
        set({ user })
      }
    },
    login: async ({ username, password }) => {
      const user = await loginService.login({ username, password })
      persistentUser.saveUser(user)
      blogService.setToken(user.token)
      set({ user })
    },
    logout: () => {
      persistentUser.removeUser()
      set({ user: null })
    },
  },
}))

export const useUser = () => useUserStore((state) => state.user)

export const useUserActions = () => useUserStore((state) => state.actions)
