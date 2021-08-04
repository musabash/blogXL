import { useState, useEffect } from 'react';
import { db } from '../firebase'

export default function usePhotoUrl(id) {
    const [url, setUrl] = useState();
    const docRef = db.collection("users").doc(id)
      
    useEffect(() => {
      let unsubscribe = docRef.get().then((doc) => {
          if (doc.exists) {
            setUrl(doc.data().photoURL)
          } else {
            setUrl(null)
          }
        }).catch((error) => {
          console.log(error)
        })
      return unsubscribe
    }, [])

    return url;
}