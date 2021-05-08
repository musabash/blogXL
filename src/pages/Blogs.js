import BlogList from '../components/blog-list'
import { UserContext } from "../contexts/UserContext"
import { useEffect, useContext, useState } from 'react'

export default function Home() {
  const { getDoc, doc, getUserLog } = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  
  useEffect(() => {
    setError("")
    setLoading(true)
    new Promise(resolve => {
      getDoc("blogs")
      getUserLog()
      resolve(setLoading(false))
    })
    .catch(error =>setError(error.message))
  }, [])
  
  return (
    <div className="home">
      {error && <div>{error}</div>}
      {console.log(loading)}
      <BlogList blogs={doc.filter(blog => blog.published)} title="All Blogs"/>
    </div>
  )
}