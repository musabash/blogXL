import { useEffect, useState } from 'react';
import { db } from '../firebase'

export default function useContent(target, id) {
    const [content, setContent] = useState();
    const docRef = db.collection(target).doc(id)
      
    useEffect(() => {
      let unsubscribe = docRef.get().then((doc) => {
          if (doc.exists) {
            setContent(doc.data())
          } else {
            setContent("No data")
          }
        }).catch((error) => {
          console.log(error)
        })
      return unsubscribe
    }, [])

    return content;
}