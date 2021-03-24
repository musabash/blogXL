import { useParams } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import {useContext, useState} from "react"
import BlogParagraph from '../components/blog-body-paragraph'
import DeleteButton from "./delete-button"
import Title from "./title"

const BlogDetails = () => {
  const [isEditable, setIsEditable] = useState(false)
  const { id } = useParams()
  const { doc, deleteBlog, updateBlog, user } = useContext(UserContext)
  const [blog] = doc.filter(e => e.id === id)
  const [body, setBody] = useState(blog.body)
  const [title, setTitle] = useState(blog.title)
  const [isAuthorised, setIsAuthorised] = useState(user.displayName === blog.author ? true : false)

  return ( 
    <div className="blog-details">
      {/* {isLoading && <div>Loading ...</div>}
      {error && <div>{error}</div>} */}
      {blog && (
        <article>
          {isEditable ? <Title title={title} setTitle={setTitle} /> :
          <h2>{title}</h2>}
          <p className="blog-author">Written by {blog.author}</p>
          <p className="blog-date">{blog.date}</p>
          <div className="blog-body">{blog.body.map((elm, index) =>
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
          
          {isAuthorised && <DeleteButton id={id} deleteBlog={deleteBlog}/>}
          
          {isEditable && isAuthorised &&
            <button onClick={() => {
              updateBlog(title, body, id)
              setIsEditable(prev => !prev)
            }}>save</button>}
            {!isEditable && isAuthorised &&
            <button onClick={() => setIsEditable(prev => !prev)}>edit</button>
          }
        </article>
        )
      }
    </div>
   );
}
 
export default BlogDetails