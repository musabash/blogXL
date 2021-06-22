import { useParams, useHistory } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import {useContext, useState, useEffect, useRef} from "react"
import InteractionBarContainer from "../containers/interaction-bar-container"
import { db } from "../firebase"
import ReactMarkdown from "react-markdown";
import gfm from 'remark-gfm';
import TextArea from "./text-area"
import MetaData from "./meta-data"
import EditButtonsContainer from "../containers/edit-buttons-container"


const BlogDetails = () => {
  const { id } = useParams()
  const { deleteBlog, updateDoc, user } = useContext(UserContext)
  const [isEditable, setIsEditable] = useState(false)
  const [blog, setBlog] = useState('')
  const [body, setBody] = useState(blog.body)
  const [title, setTitle] = useState(blog.title)
  const history = useHistory();
  const authorised = user ? user.uid === blog.authorId : false
  const mdRef = useRef()


  useEffect(() => {
    let unsubscribe = db.collection('blogs').onSnapshot((snapshot) => {
      setBlog(snapshot.docs.filter(doc => doc.id === id)[0].data())
    })
    return (() => unsubscribe())
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
    const obj = {title, body, published: true}
    updateDoc("blogs", obj, id)
    setIsEditable(prev => !prev)
  }

  function handleDelete() {
    deleteBlog("blogs", id)
    history.goBack()
  }
  
  return (
    <>
      <InteractionBarContainer 
        history={history}
        user={user}
        blog={blog}
        authorised={authorised}
        id={id}
      />
      <div className="blog-details">
        <article>
          <MetaData
            span={blog.author} 
            dataPrimary="Written by"
            dataSecondary={blog.date}
          />         
          <ReactMarkdown 
            remarkPlugins={[gfm]}
            className="markdown"
            children={title} 
            components={{p: 'h1'}}
          />
          <div className="blog-body" ref={mdRef} >
            {
              isEditable
              ?
              <TextArea
                value={body}
                setValue={setBody}
                mdRef={mdRef}
              />
              :
              <ReactMarkdown
                remarkPlugins={[gfm]}
                className="markdown"
                children={body}
              />
            }
          </div>
          <EditButtonsContainer 
            isEditable={isEditable} 
            handleEdit={handleEdit}
            id={id}
            authorised={authorised}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />         
        </article>
      </div>
    </>
   );
}
 
export default BlogDetails