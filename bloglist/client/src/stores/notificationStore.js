import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const useNotificationStore = create(
  devtools((set) => ({
    message: null,
    isError: false,
    setNotification: (message, isError = false) => {
      set({ message, isError })
      setTimeout(() => set({ message: null }), 2500)
    },
  })),
)

export const useNotification = () => {
  const message = useNotificationStore((state) => state.message)
  const isError = useNotificationStore((state) => state.isError)
  return { message, isError }
}

export const useNotificationActions = () =>
  useNotificationStore((state) => state.setNotification)
