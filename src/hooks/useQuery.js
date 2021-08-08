import { useEffect, useState } from 'react';
import { db } from '../firebase'

export default function useQuery(coll, where, condition, val) {
    const [content, setContent] = useState();
    const docRef = db.collection(coll)
      
    useEffect(() => {
      let query = docRef.where(where, condition, val);
      let unsubscribe = query.get().then((querySnapshot) => {
        let arr = querySnapshot.docs.map(elm => elm.data())
        setContent(arr)
      }
        ).catch((error) => {
          console.log(error)
        })
      return unsubscribe
    }, [val])

    return content;
}