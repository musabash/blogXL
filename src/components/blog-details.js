import { useHistory, useParams } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import {useContext, useState} from "react"
import BlogParagraph from '../components/blog-body-paragraph'

const BlogDetails = () => {
  const [isEditable, setIsEditable] = useState(false)
  const { id } = useParams()
  const history = useHistory()
  const { doc, deleteBlog, updateBlog } = useContext(UserContext)
  const [blog] = doc.filter(e => e.id === id)
  const [body, setBody] = useState(blog.body)

  return ( 
    <div className="blog-details">
      {/* {isLoading && <div>Loading ...</div>}
      {error && <div>{error}</div>} */}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body.map((elm, index) =>
            isEditable ?
              <BlogParagraph
                index={index}
                par={elm}
                body={body}
                setBody={setBody}
              /> :
            <p>{elm}</p> 
          )}
          </div>
          <div>{blog.date}</div>
          <button onClick={() => {
            deleteBlog(id)
            history.push('/home')
          }}>delete</button>
          {isEditable ?
            <button onClick={() => {
              updateBlog(body, id)
              setIsEditable(prev => !prev)
            }}>save</button> :
            <button onClick={() => setIsEditable(prev => !prev)}>edit</button>
          }
        </article>
        )
      }
    </div>
   );
}
 
export default BlogDetails