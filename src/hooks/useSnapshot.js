import { useState, useEffect } from 'react'
import { db } from '../firebase'

export default function useSnapshot(id, ) {
  const [blog, setBlog] = useState()

  useEffect(() => {
    let unsubscribe = db.collection('blogs').onSnapshot((snapshot) => {
      setBlog(snapshot.docs.map(doc => doc.data()).filter(doc => doc.id === id))
    })
    return (() => unsubscribe())
  }, [])

  return blog
}
