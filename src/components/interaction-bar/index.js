import {FaRegShareSquare, FaRegHeart, FaHeart, FaRegComment, FaRegBookmark, FaBookmark} from "react-icons/fa"

function InteractionBar({children, ...restProps}) {
  return (
    <div className="interaction-bar__container" {...restProps}>
      {children}
    </div>
  )
}

InteractionBar.Authorised = function InteractionBarAuthorised({length, name}) {
  return <p>{length} {length === 1 ? name.slice(-1) : name}</p>
}

InteractionBar.Share = function InteractionBarShare({...restProps}) {
  return <FaRegShareSquare className="icon" {...restProps}/>
}

InteractionBar.Like = function InteractionBarLike({isLiked, ...restProps}) {
  return isLiked ? <FaHeart className="icon" {...restProps}/> : <FaRegHeart className="icon" {...restProps}/>
}

InteractionBar.Comment = function InteractionBarComment({...restProps}) {
  return <FaRegComment className="icon" {...restProps}/>
}

InteractionBar.Bookmark = function InteractionBarBookmark({bookmarked, ...restProps}) {
  return bookmarked ? <FaBookmark className="icon" {...restProps}/> : <FaRegBookmark className="icon" {...restProps}/>
}

InteractionBar.Hey = function InteractionBarHey({children, ...restProps}) {
  return <div {...restProps}>{children}</div>
}

export default InteractionBar