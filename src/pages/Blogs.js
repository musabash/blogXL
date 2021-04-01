import BlogList from '../components/blog-list'
import { UserContext } from "../contexts/UserContext"
import { useEffect, useContext } from 'react'

export default function Home() {
  const { getDoc, doc } = useContext(UserContext)

  useEffect(() => {
    const unsubscribe = getDoc()
  }, [])
  return (
    <div className="home">
      {/* {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>} */}
      {doc && <BlogList blogs={doc} title="All Blogs"/>}
    </div>
  )
}