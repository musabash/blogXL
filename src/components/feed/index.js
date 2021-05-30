import { FaChartLine } from "react-icons/fa"
import { Link } from 'react-router-dom'
import ProfilePicture from "../profile-picture"

function Feed({children, ...restProps}) {
  return (
    <div className="feed__container" {...restProps}>
      <FaChartLine />
      {children}
    </div>
  )
}

Feed.Banner = function FeedBanner({children, ...restProps}) {
  return (<div className="feed__banner" {...restProps}>{children}</div>)
}

Feed.Trending = function FeedTrending({children, ...restProps}) {
  return (<div className="feed__trending" {...restProps}>{children}</div>)
}

Feed.Item = function FeedItem({children, user, handleClick, blog,...restProps}) {
  return (
    <div className="blog-preview" {...restProps}>
      <ProfilePicture handleClick={handleClick} photoURL={user.photoURL} size="40px" borderRadius="50%"/> 
      <Link to={`blogs/${blog.id}`}>
        <h2>{blog.title}</h2>
        <p>Written by: {blog.author}</p>
      </Link>
      {children}
    </div>
  )
}

Feed.Discover = function FeedDiscover({children, ...restProps}) {
  return (<div className="feed__discover" {...restProps}>{children}</div>)
}

Feed.All = function FeedAll({children, ...restProps}) {
  return (<div className="feed__all" {...restProps}>{children}</div>)
}

export default Feed

const BlogList = ({blogs, title}) => {

  return ( 
    <div className="blog-list">
      <h2>{title}</h2>
      {blogs.map ((blog) => (
        <div className="blog-preview" key={blog.id}>
          <Link to={`blogs/${blog.id}`}>
            <h2>{blog.title}</h2>
            <p>Written by: {blog.author}</p>
          </Link>
        </div>
      ))}
    </div>
   );
}