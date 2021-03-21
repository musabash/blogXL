import { useHistory, useParams } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import {useContext} from "react"

const BlogDetails = () => {
  const { id } = useParams()
  const history = useHistory()
  const { getDoc, doc } = useContext(UserContext)
  const [blog] = doc.filter(e => e.id === id)

  const handleClick = () => {
      history.push('/home')
  }
  return ( 
    <div className="blog-details">
      {/* {isLoading && <div>Loading ...</div>}
      {error && <div>{error}</div>} */}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body.map(e => <p>{e}</p>)}</div>
          <div>{blog.date}</div>
          <button onClick={handleClick}>delete</button>
        </article>
      )}
      
    </div>
   );
}
 
export default BlogDetails