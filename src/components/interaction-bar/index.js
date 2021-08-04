import React, {useState, useEffect, useContext, createContext} from "react"
import {FaRegShareSquare, FaRegHeart, FaHeart, FaComment, FaRegComment, FaRegBookmark, FaBookmark} from "react-icons/fa"
import firebase, { db } from "../../firebase"
import styled from "styled-components"
import { useAuthListener } from "../../hooks"

const Inner = styled.div`
  padding: 0 0.2em;
  margin: 0.1em;
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(153, 152, 152, 0.5);
`
const Container = styled.div`
  
  ${({ singleItem, size }) => !singleItem ? `
  position: fixed;
  top: 0;
  left: 0;
  padding: 5em 0.2em;
  width: 5.5em;
  display: flex;
  height: 100%;
  flex-direction: column;
  background-color: #fcfcfc;
  box-shadow: 1px 0 5px 0 #dbdbdb;
  overflow-x: hidden;
  overflow-y: auto;
  ` : `width: ${ size && size };
      margin: 0;
      > * {border: none;}`};
`

const InteractionContext = createContext()

function InteractionBar({children, blog, ...restProps}) {

  const [isLiked, setIsLiked] = useState()
  const [isBookmarked, setIsBookmarked] = useState()
  const {user} = useAuthListener()

  useEffect(() => {
    if (blog){
      setIsLiked(blog.likes.includes(user.uid))
      setIsBookmarked(blog.bookmarks.includes(user.uid))
    }  
    }, [blog])

  function handleInteraction(currentStatus, key) {
    const RefBlog = db.collection("blogs").doc(blog.id);
    const RefUser = db.collection("users").doc(user.uid);
    console.log("hey")
    if (currentStatus){
      RefBlog.update({
        [key]: firebase.firestore.FieldValue.arrayRemove(user.uid)
      })
      RefUser.update({
        [key]: firebase.firestore.FieldValue.arrayRemove(blog.id)
      })
    } else {
      RefBlog.update({
        [key]: firebase.firestore.FieldValue.arrayUnion(user.uid)
      })
      RefUser.update({
        [key]: firebase.firestore.FieldValue.arrayUnion(blog.id)
      })
    }
  }

  return (
    <InteractionContext.Provider value={{isLiked, setIsLiked, isBookmarked, setIsBookmarked, blog, handleInteraction}}>
      <Container {...restProps}>
        {children}
      </Container>
    </InteractionContext.Provider>
    
  )
}


InteractionBar.Authorised = function InteractionBarAuthorised() {

  const {blog} = useContext(InteractionContext)
  const length = blog ? [blog.comments.length, blog.bookmarks.length, blog.likes.length] : []

  return (
    <>
      <Inner>
        {length[0]}
        {
          length[0] === 0
            ?
          <FaRegComment className="icon"/>
            :
          <FaComment className="icon"/>
        }
      </Inner>

      <Inner>
        {length[1]}
        {
          length[1] === 0
            ?
          <FaRegBookmark className="icon"/>
            :
          <FaBookmark className="icon"/>
        } 
      </Inner>

      <Inner>
        {length[2]}
        {
          length[2] === 0
            ?
          <FaRegHeart className="icon"/>
            :
          <FaHeart className="icon"/>
        }
     </Inner>      
    </>
  )
}

InteractionBar.Share = function InteractionBarShare({...restProps}) {
  return <Inner><FaRegShareSquare onClick={() => alert("This property will be added soon")} className="icon__btn" {...restProps}/></Inner>
}

InteractionBar.Like = function InteractionBarLike({...restProps}) {

  const {isLiked, handleInteraction} = useContext(InteractionContext)

  return (
    <Inner onClick={() => handleInteraction(isLiked, "likes")}>
      {isLiked ? <FaHeart className="icon__btn" {...restProps}/> : <FaRegHeart className="icon__btn" {...restProps}/>}
    </Inner>
  )
}

InteractionBar.Comment = function InteractionBarComment({...restProps}) {
  return (
    <Inner onClick={() => alert("This property will be added soon")}>
      <FaRegComment className="icon__btn" {...restProps}/>
    </Inner>
  ) 
}

InteractionBar.Bookmark = function InteractionBarBookmark({...restProps}) {

  const {isBookmarked, handleInteraction} = useContext(InteractionContext)

  return (
    <Inner onClick={() => handleInteraction(isBookmarked, "bookmarks")}>
      {isBookmarked ? <FaBookmark className="icon__btn" {...restProps}/> : <FaRegBookmark className="icon__btn" {...restProps}/>}
    </Inner>
  ) 
}

InteractionBar.Hey = function InteractionBarHey({children, ...restProps}) {
  return <div {...restProps}>{children}</div>
}

export default InteractionBar



