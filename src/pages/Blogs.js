import BlogList from '../components/blog-list'
import { UserContext } from "../contexts/UserContext"
import { useEffect, useContext } from 'react'

export default function Home() {
  const { getDoc, doc, getUserLog } = useContext(UserContext)

  useEffect(() => {
    getDoc("blogs")
    getUserLog()
  }, [])
  return (
    <div className="home">
      {/* {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>} */}
      {doc && <BlogList blogs={doc} title="All Blogs"/>}
    </div>
  )
}