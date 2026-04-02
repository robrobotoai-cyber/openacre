import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const files = fs.readdirSync(postsDirectory)
  const posts = files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const fullPath = path.join(postsDirectory, file)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug: data.slug,
        title: data.title,
        date: data.date,
        category: data.category,
        author: data.author,
        excerpt: data.excerpt,
        content
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return posts
}

export function getPostBySlug(slug) {
  const files = fs.readdirSync(postsDirectory)
  const file = files.find(f => {
    const fullPath = path.join(postsDirectory, f)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    return data.slug === slug
  })

  if (!file) return null

  const fullPath = path.join(postsDirectory, file)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug: data.slug,
    title: data.title,
    date: data.date,
    category: data.category,
    author: data.author,
    excerpt: data.excerpt,
    content
  }
}

export function getAllSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const files = fs.readdirSync(postsDirectory)
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const fullPath = path.join(postsDirectory, file)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      return data.slug
    })
}
