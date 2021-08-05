import {BlogList} from '../components'
import { UserContext } from "../contexts/UserContext"
import { useEffect, useContext, useState } from 'react'

export function Blogs() {
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
    loading ? <p>Loading...</p> : <div className="blogs">
      {error && <div>{error}</div>}
      <BlogList showAuthor={true} displayName={user.displayName} blogs={doc.filter(blog => blog.published)} title="All Blogs"/>
    </div>
  )
}