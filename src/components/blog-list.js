import {ProfilePicture} from "../components";
import { useAuthListener } from "../hooks";
import Card from "./card";
import Feed from "./feed";
import InteractionBar from "./interaction-bar";

export const BlogList = ({blogs, showAuthor, pub}) => {
  const {user} = useAuthListener()

  return (
      <Feed.Group>
        {blogs.map ((blog) => (
          <Card.Container key={blog.id}>
            {
              showAuthor && 
              <Card.Group justifyContent="space-between" margin=".5em">
                <Card.Group>
                  <ProfilePicture displayName=" " id={blog.authorId} size="40px" borderRadius="50%"/>
                  <Card.Text>{blog.author}</Card.Text>
                </Card.Group>
                <div>...</div>
              </Card.Group>
            }
            <Card.Link to={`blogs/${blog.id}`}>
              <Card.Title>{blog.title}</Card.Title>
              {blog.body.slice(0, 35)} ...
            </Card.Link>
            <Card.Group justifyContent="space-between" margin="1em">
              <Card.SmallText>{blog.date}</Card.SmallText>
              {!pub && user.uid !== blog.authorId && <InteractionBar blog={blog} id={blog.id} singleItem size="1.5em"><InteractionBar.Bookmark/></InteractionBar>}
            </Card.Group>
          </Card.Container>
        ))}
      </Feed.Group>
   );
}


