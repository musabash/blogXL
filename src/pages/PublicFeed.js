import React, {useState, useEffect} from 'react'
import { Feed, BlogList } from '../components'
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
      <BlogList blogs={blogs.filter(blog => blog.published)} showAuthor pub/>
    </Feed>
  )
}