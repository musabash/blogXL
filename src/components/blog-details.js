import { useParams } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import {useContext, useState} from "react"
import BlogParagraph from '../components/blog-body-paragraph'
import DeleteButton from "./delete-button"
import Title from "./title"
import { InteractionBar } from "../components"

const BlogDetails = () => {
  const [isEditable, setIsEditable] = useState(false)
  const { id } = useParams()
  const { doc, deleteBlog, updateDoc, user, userLog } = useContext(UserContext)
  const [blog] = doc.filter(e => e.id === id)
  const [body, setBody] = useState(blog.body)
  const [title, setTitle] = useState(blog.title)
  const [likes, setLikes] = useState(blog.likes)
  const [userLikes, setUserLikes] = useState(userLog.likes)
  const [bookmarks, setBookmarks] = useState(userLog.bookmarks)
  const [isLiked, setIsLiked] = useState(() => [...likes].includes(user.uid))
  const [bookmarked, setBookmarked] = useState(() => [...bookmarks].includes(user.uid))
  const isAuthorised = user.displayName === blog.author

  function EditButton({name}) {
    return <button onClick={() => setIsEditable(prev => !prev)}>{name}</button>
  }

  const handleUpdate = () => {
    let obj = {title, body}
    updateDoc("blogs", obj, id)
    setIsEditable(prev => !prev)
  }

  const handleBookmark = () => {
    let bookmarkArr = []
    if (bookmarked) {
      bookmarkArr = bookmarks.filter(elm => elm !== id)
    } else {
      bookmarkArr = [...bookmarks, id]
    }
    updateDoc("users", {bookmarks: bookmarkArr}, user.uid)
    setBookmarks(bookmarkArr)
    setBookmarked(prev => !prev)
  }

  const handleLike = () => {
    let likesArr = []
    let userLikesArr = []
    if (isLiked) {
      userLikesArr = userLikes.filter(elm => elm !== id)
      likesArr = likes.filter(elm => elm !== user.uid)
    } else {
      userLikesArr = [...userLikes, id]
      likesArr = [...likes, user.uid]
    }
    updateDoc("blogs", {likes: likesArr}, id)
    updateDoc("users", {likes: userLikesArr}, user.uid)
    setLikes(likesArr)
    setUserLikes(userLikesArr)
    setIsLiked(prev => !prev)
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
        <InteractionBar.Bookmark bookmarked={bookmarked} onClick={handleBookmark} />
        <InteractionBar.Like isLiked={isLiked} onClick={handleLike} />
      </InteractionBar>
      <p>{likes.length}</p>
    </div>
   );
}
 
export default BlogDetails