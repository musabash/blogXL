import {useEffect, useState} from "react"
import { InteractionBar } from "../components"
import firebase, { db } from "../firebase"

export default function InteractionBarContainer({id, authorised, blog, user}) {
  const [liked, setLiked] = useState()
  const [bookmarked, setBookmarked] = useState()

  useEffect(() => {
    if (blog){
      setLiked(blog.likes.includes(user.uid))
      setBookmarked(blog.bookmarks.includes(user.uid))
    }  
    }, [blog])

  function handleInteraction(currentStatus, key) {
    const RefBlog = db.collection("blogs").doc(id);
    const RefUser = db.collection("users").doc(user.uid);
    if (currentStatus){
      RefBlog.update({
        [key]: firebase.firestore.FieldValue.arrayRemove(user.uid)
      })
      RefUser.update({
        [key]: firebase.firestore.FieldValue.arrayRemove(id)
      })
    } else {
      RefBlog.update({
        [key]: firebase.firestore.FieldValue.arrayUnion(user.uid)
      })
      RefUser.update({
        [key]: firebase.firestore.FieldValue.arrayUnion(id)
      })
    }
    
  }

  return (
    <InteractionBar>
      <InteractionBar.Share />
      {
        authorised
        ?
        <>
        {["comments", "bookmarks", "likes"].map(elm => <InteractionBar.Authorised key={elm} name={elm} length={blog[elm] && blog[elm].length}/>)}
        </>
        :
        <>
        <InteractionBar.Comment />
        <InteractionBar.Bookmark bookmarked={bookmarked} onClick={() => handleInteraction(bookmarked, "bookmarks")} />
        <InteractionBar.Like isLiked={liked} onClick={() => handleInteraction(liked, "likes")} />
        </>
      }
    </InteractionBar>
  )
}
