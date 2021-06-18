import { Link } from "react-router-dom";
import ProfilePicture from "./profile-picture";

const BlogList = ({blogs, showAuthor}) => {

  return ( 
    <div className="blog-list">
      {blogs.map ((blog) => (
        <div className="blog-preview" key={blog.id}>
          <Link to={`blogs/${blog.id}`}>
            {showAuthor && <p>{blog.photoURL && <ProfilePicture displayName=" " photoURL={blog.photoURL} size="40px" borderRadius="50%"/>}by {blog.author}</p>}
            <h2>{blog.title}</h2>
            <h6>{blog.date}</h6>
          </Link>
        </div>
      ))}
    </div>
   );
}
 
export default BlogList;