import { useState, useEffect } from 'react'
import { db } from '../firebase'

export default function useSnapshot(collection, id) {
  const [content, setContent] = useState()

  useEffect(() => {
    let unsubscribe = db.collection(collection).doc(id).onSnapshot((snapshot) => {
      setContent(snapshot.data())
    })
    return (() => unsubscribe())
  }, [])

  return content
}
