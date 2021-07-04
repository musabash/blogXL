import { useState, useEffect } from 'react'
import { db } from '../firebase'

export default function useSnapshot(collection, id) {
  const [content, setContent] = useState()

  useEffect(() => {
    let unsubscribe = db.collection(collection).onSnapshot((snapshot) => {
      setContent(snapshot.docs.map(doc => doc.data()).filter(doc => doc.id === id))
    })
    return (() => unsubscribe())
  }, [])

  return content
}
