import { useParams, useHistory } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import {useContext, useState, useEffect } from "react"
import BlogParagraph from '../components/blog-body-paragraph'
import Title from "./title"
import InteractionBarContainer from "../containers/interaction-bar-container"
import { db } from "../firebase"
import { GoBackBtn, EditButton, DeleteButton } from "./buttons"

const BlogDetails = () => {
  
  const { id } = useParams()
  const { deleteBlog, updateDoc, user } = useContext(UserContext)
  const [isEditable, setIsEditable] = useState(false)
  const [blog, setBlog] = useState('')
  const [body, setBody] = useState(blog.body)
  const [title, setTitle] = useState(blog.title)
  const history = useHistory();
  const authorised = user.uid === blog.authorId

  useEffect(() => {
    db.collection('blogs').onSnapshot((snapshot) => {
      setBlog(snapshot.docs.filter(doc => doc.id === id)[0].data())
    })
  }, [])

  useEffect(() => {
    if (blog) {
      setBody(blog.body)
      setTitle(blog.title)
    }
  }, [blog])
  
  function handleEdit() {
      setIsEditable(prev => !prev)
      setBody(blog.body)
  }

  function handleUpdate() {
    let obj = {title, body, published: true}
    updateDoc("blogs", obj, id)
    setIsEditable(prev => !prev)
  }

  function handleDelete() {
    deleteBlog("blogs", id)
    history.goBack()
  }

  return (
    <div className="blog-details">
      <GoBackBtn history={history}/>
      <article>
        {isEditable ? <Title title={title} setTitle={setTitle} /> : <h2>{title}</h2>}
        <p className="blog-author">Written by {blog.author}</p>
        <p className="blog-date">{blog.date}</p>
        
        <div className="blog-body">{body && body.map((elm, index) =>
          isEditable ?
          <BlogParagraph
            key={Math.random()}
            index={index}
            par={elm}
            body={body}
            setBody={setBody}
          /> :
          <p key={Math.random()}>{elm}</p> 
        )}
        </div>
        
        {authorised && <EditButton name={isEditable ? "cancel" : "edit"} handleEdit={handleEdit}/>}
        {authorised && isEditable && 
          <>
            <DeleteButton
              id={id}
              handleDelete={handleDelete}  
            />
            <EditButton handleEdit={handleUpdate} name="save"/>
          </>
        }            
      </article>
      <InteractionBarContainer user={user} blog={blog} authorised={authorised} id={id}/>
    </div>
   );
}
 
export default BlogDetails