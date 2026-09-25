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
    addLike: async (blog) => {
      const updatedBlog = await blogService.update({
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id,
      })
      set((state) => ({
        blogs: state.blogs.map((b) => (b.id === blog.id ? updatedBlog : b)),
      }))
    },
    addComment: async (blog, comment) => {
      const updatedBlog = await blogService.comment(blog.id, comment)
      set((state) => ({
        blogs: state.blogs.map((b) => (b.id === blog.id ? updatedBlog : b)),
      }))
    },
    removeBlog: async (blog) => {
      await blogService.remove(blog.id)
      set((state) => ({ blogs: state.blogs.filter((b) => b.id !== blog.id) }))
    },
  },
}))

const byLikes = (a, b) => b.likes - a.likes

export const useBlogs = () => {
  const blogs = useBlogStore((state) => state.blogs)
  return blogs.toSorted(byLikes)
}

export const useBlogActions = () => useBlogStore((state) => state.actions)
