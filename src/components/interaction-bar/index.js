import {FaRegShareSquare, FaRegHeart, FaHeart, FaRegComment, FaRegBookmark, FaBookmark} from "react-icons/fa"

function InteractionBar({children, ...restProps}) {
  return (
    <div className="interaction-bar__container" {...restProps}>
      {children}
    </div>
  )
}

InteractionBar.Authorised = function InteractionBarAuthorised({length}) {
  return (
    <>
    <div className="interaction-bar__authorised"></div>
     <div className="flex-row">{length[0]}{length[0] !== 0 ? <FaHeart className="icon"/> : <FaRegHeart className="icon"/>}</div>
    <div className="flex-row">{length[1]}{<FaRegComment className="icon" />}</div>
    <div className="flex-row">{length[2]}{length[2] !== 0 ? <FaBookmark className="icon"/> : <FaRegBookmark className="icon"/>}</div>
      
    </>
  )
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



