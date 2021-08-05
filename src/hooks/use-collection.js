import { useEffect, useState } from 'react';
import { db } from '../firebase'

export default function useCollection(coll) {
    const [content, setContent] = useState();
    const docRef = db.collection(coll)
      
    useEffect(() => {
      let unsubscribe = docRef
      .onSnapshot((snapshot) => {
      setContent(snapshot.docs.map(doc => doc.data()))
      }, (error) => {console.log(error)})
      return unsubscribe
    }, [])
    return content;
}