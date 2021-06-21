import {useEffect, useState} from "react"
import { InteractionBar } from "../components"
import { GoBackBtn } from "../components/buttons"
import firebase, { db } from "../firebase"

export default function InteractionBarContainer({id, authorised, blog, user, history}) {
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
      <GoBackBtn history={history}/>
      <InteractionBar.Share />
      {
        authorised
        ?
        <InteractionBar.Authorised length={
          [blog.comments.length, blog.bookmarks.length, blog.likes.length]}/>
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
