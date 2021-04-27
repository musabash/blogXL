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
  const [blog, setBlog] = useState(doc.filter(e => e.id === id))
  const [likes, setLikes] = useState(blog[0].likes)
  const [comments, setComments] = useState(blog[0].comments)
  const [body, setBody] = useState(blog[0].body)
  const [title, setTitle] = useState(blog[0].title)
  const [userLikes, setUserLikes] = useState(userLog.likes)
  const [userBookmarks, setUserBookmarks] = useState(userLog.bookmarks)
  const [bookmarks, setBookmarks] = useState(blog[0].bookmark)
  const [isLiked, setIsLiked] = useState(() => userLikes.includes(id))
  const [bookmarked, setBookmarked] = useState(() => [...userBookmarks].includes(id))
  const isAuthorised = user.displayName === blog[0].author

  function EditButton({name}) {
    return <button onClick={() => setIsEditable(prev => !prev)}>{name}</button>
  }

  const handleUpdate = () => {
    let obj = {title, body}
    updateDoc("blogs", obj, id)
    setIsEditable(prev => !prev)
  }
  
  const handleBookmark = () => {
    let userBookmarksArr = []
    let bookmarksArr = []
    if (bookmarked) {
      userBookmarksArr = userBookmarks.filter(elm => elm !== id)
      bookmarksArr = bookmarks.filter(elm => elm !== user.uid)
    } else {
      userBookmarksArr = [...userBookmarks, id]
      bookmarksArr = [...bookmarks, user.uid]
    }
    setBookmarks([...bookmarksArr])
    setUserBookmarks([...userBookmarksArr])
    updateDoc("users", {bookmarks: userBookmarksArr}, user.uid)
    updateDoc("blogs", {bookmark: bookmarksArr}, id)
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
    setUserLikes(userLikesArr)
    setLikes(likesArr)
    updateDoc("users", {likes: userLikesArr}, user.uid)
    updateDoc("blogs", {likes: likesArr}, id)
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
        {isAuthorised ? <p>{comments.length} comment{comments.length > 1 && "s"}</p> : <InteractionBar.Comment />}
        {isAuthorised ? <p>{likes.length} like{likes.length > 1 && "s"}</p> : <InteractionBar.Bookmark bookmarked={bookmarked} onClick={handleBookmark} />}
        {isAuthorised ? <p>{bookmarks.length} bookmark{bookmarks.length > 1 && "s"}</p> : <InteractionBar.Like isLiked={isLiked} onClick={handleLike} />}
      </InteractionBar>
      <p>{likes.length}</p>
    </div>
   );
}
 
export default BlogDetails