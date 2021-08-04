import React, {useState, useEffect} from 'react'
import { Feed, Card, ProfilePicture } from '../components'
import {db} from '../firebase'

export function PublicFeed() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    let unsubscribe = db.collection('blogs').onSnapshot((snapshot) => {
      setBlogs(snapshot.docs.map(doc => doc.data()))
    })
    return (() => unsubscribe())
  }, [])

  return (
    <Feed>
      <Feed.Group>
        {blogs.filter(blog => blog.published).map ((blog) => (
          <Card.Container key={blog.id}>
            {
              <Card.Group justifyContent="space-between" margin=".5em"> 
                <ProfilePicture displayName=" " id={blog.authorId} size="40px" borderRadius="50%"/>
                <Card.Text>{blog.author}</Card.Text>
              </Card.Group>
            }
            <Card.Link to={`blogs/${blog.id}`}>
              <Card.Title>{blog.title}</Card.Title>
              {blog.body.slice(0, 35)} ...
            </Card.Link>
            <Card.Group justifyContent="space-between" margin="1em">
              <Card.SmallText>{blog.date}</Card.SmallText>
            </Card.Group>
          </Card.Container>
        ))}
      </Feed.Group>
    </Feed>
  )
}