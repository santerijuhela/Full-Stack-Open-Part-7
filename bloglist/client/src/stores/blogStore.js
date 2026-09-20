import { create } from 'zustand'
import blogService from '../services/blogs'

const useBlogStore = create((set) => ({
  blogs: [],
  actions: {
    initialize: async () => {
      const blogs = await blogService.getAll()
      set(() => ({ blogs }))
    },
    createBlog: async (blogObject) => {
      const createdBlog = await blogService.create(blogObject)
      set((state) => ({ blogs: [...state.blogs, createdBlog] }))

      return createdBlog
    },
  },
}))

const byLikes = (a, b) => b.likes - a.likes

export const useBlogs = () => {
  const blogs = useBlogStore((state) => state.blogs)
  return blogs.toSorted(byLikes)
}

export const useBlogActions = () => useBlogStore((state) => state.actions)
