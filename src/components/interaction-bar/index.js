import {FaRegShareSquare, FaRegHeart, FaHeart, FaRegComment, FaRegBookmark, FaBookmark} from "react-icons/fa"

function InteractionBar({children, ...restProps}) {
  return (
    <div className="interaction-bar__container" {...restProps}>
      {children}
    </div>
  )
}

InteractionBar.Share = function InteractionBarShare({...restProps}) {
  return <FaRegShareSquare {...restProps}/>
}

InteractionBar.Like = function InteractionBarLike({isLiked, ...restProps}) {
  return isLiked ? <FaHeart {...restProps}/> : <FaRegHeart {...restProps}/>
}

InteractionBar.Comment = function InteractionBarComment({...restProps}) {
  return <FaRegComment {...restProps}/>
}

InteractionBar.Bookmark = function InteractionBarBookmark({bookmarked, ...restProps}) {
  return bookmarked ? <FaBookmark {...restProps}/> : <FaRegBookmark {...restProps}/>
}

InteractionBar.Hey = function InteractionBarHey({children, ...restProps}) {
  return <div {...restProps}>{children}</div>
}

export default InteractionBar