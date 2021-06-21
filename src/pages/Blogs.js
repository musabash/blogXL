import BlogList from '../components/blog-list'
import { UserContext } from "../contexts/UserContext"
import { useEffect, useContext, useState } from 'react'

export default function Blogs() {
  const { getCollection, doc, getUserLog, user } = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setError("")
    setLoading(true)
    new Promise(resolve => {
      getCollection("blogs")
      getUserLog()
      resolve(setLoading(false))
    })
    .catch(error =>setError(error.message))
  }, [])
  
  return (
    <div className="blogs">
      {error && <div>{error}</div>}
      <BlogList showAuthor={true} displayName={user.displayName} blogs={doc.filter(blog => blog.published)} title="All Blogs"/>
    </div>
  )
}