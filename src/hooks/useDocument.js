import { useEffect, useState } from 'react';
import { db } from '../firebase'

export default function useContent(target, id) {
    const [content, setContent] = useState();
    const docRef = db.collection(target).doc(id)

    useEffect(() => {
      let unsubscribe = docRef.onSnapshot((snapshot) => {
          if (snapshot.exists) {
            setContent(snapshot.data())
          } else {
            setContent("No data")
          }
        })
      return unsubscribe
    }, [])

    return content;
}