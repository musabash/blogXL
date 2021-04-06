import { useParams } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import {useContext, useState} from "react"
import BlogParagraph from '../components/blog-body-paragraph'
import DeleteButton from "./delete-button"
import Title from "./title"
import InteractionBar from "./interaction-bar/interaction-bar"

const BlogDetails = () => {
  const [isEditable, setIsEditable] = useState(false)
  const { id } = useParams()
  const { doc, deleteBlog, updateDoc, user } = useContext(UserContext)
  const [blog] = doc.filter(e => e.id === id)
  const [body, setBody] = useState(blog.body)
  const [title, setTitle] = useState(blog.title)
  const [likes, setLikes] = useState(blog.likes)
  const [isLiked, setIsLiked] = useState(() => [...likes].includes(user.uid))
  const [bookmarked, setBookmarked] = useState(true)
  const isAuthorised = user.displayName === blog.author

  function EditButton({name}) {
    return <button onClick={() => setIsEditable(prev => !prev)}>{name}</button>
  }

  const handleUpdate = () => {
    let obj = {title, body}
    updateDoc(obj, id)
    setIsEditable(prev => !prev)
  }

  function BlogBody() {
    return (
      <div className="blog-body">{body.map((elm, index) =>
        isEditable ?
          <BlogParagraph
            key={index}
            index={index}
            par={elm}
            body={body}
            setBody={setBody}
          /> :
        <p key={index}>{elm}</p> 
      )}
      </div>
    )
  }

  return (
    <div className="blog-details">
      <article>
        {isEditable ? <Title title={title} setTitle={setTitle} /> :
        <h2>{title}</h2>}
        <p className="blog-author">Written by {blog.author}</p>
        <p className="blog-date">{blog.date}</p>
        <BlogBody />
        
        {isAuthorised && <EditButton name={isEditable ? "cancel" : "edit"} />}
        {isAuthorised && isEditable && 
          <>
            <DeleteButton id={id} deleteBlog={deleteBlog}/>
            <button onClick={handleUpdate}>save</button>
          </>
        }            
      </article>
      <InteractionBar>
        <InteractionBar.Share />
        <InteractionBar.Comment />
        <InteractionBar.Bookmark bookmarked={bookmarked} onClick={() => {
          console.log(user.uid)
          setBookmarked(prev => !prev)}
        } />
        <InteractionBar.Like isLiked={isLiked} onClick={() => {
          if (isLiked) {
            let likesArr = likes.filter(elm => elm !== user.uid)
            updateDoc({likes: likesArr}, id)
            setLikes(likesArr)
            setIsLiked(prev => !prev)
          } else if (!isLiked){
            let likesArr = [...likes, user.uid]
            updateDoc({likes: likesArr}, id)
            setLikes(likesArr)
            setIsLiked(prev => !prev)
          }
        }} />
      </InteractionBar>
      <p>{likes.length}</p>
    </div>
   );
}
 
export default BlogDetails