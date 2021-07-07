import {FaRegShareSquare, FaRegHeart, FaHeart, FaComment, FaRegComment, FaRegBookmark, FaBookmark} from "react-icons/fa"
import styled from "styled-components"

function InteractionBar({children, ...restProps}) {
  return (
    <div className="interaction-bar__container" {...restProps}>
      {children}
    </div>
  )
}

const Inner = styled.div`
  padding: 0 0.2em;
  margin: 0.1em;
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(153, 152, 152, 0.5);
`

InteractionBar.Authorised = function InteractionBarAuthorised({length}) {
  return (
    <>
    <div className="interaction-bar__authorised"></div>
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
  return <Inner><FaRegShareSquare className="icon__btn" {...restProps}/></Inner>
}

InteractionBar.Like = function InteractionBarLike({isLiked, ...restProps}) {
  return (
    <Inner>
      {isLiked ? <FaHeart className="icon__btn" {...restProps}/> : <FaRegHeart className="icon__btn" {...restProps}/>}
    </Inner>
  )
}

InteractionBar.Comment = function InteractionBarComment({...restProps}) {
  return (
    <Inner>
      <FaRegComment className="icon__btn" {...restProps}/>
    </Inner>
  ) 
}

InteractionBar.Bookmark = function InteractionBarBookmark({bookmarked, ...restProps}) {
  return (
    <Inner>
      {bookmarked ? <FaBookmark className="icon__btn" {...restProps}/> : <FaRegBookmark className="icon__btn" {...restProps}/>}
    </Inner>
  ) 
}

InteractionBar.Hey = function InteractionBarHey({children, ...restProps}) {
  return <div {...restProps}>{children}</div>
}

export default InteractionBar



