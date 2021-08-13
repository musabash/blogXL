import { useEffect, useState } from 'react';
import { db } from '../firebase'

export default function useQuery(coll, qOne, qTwo) {
    const [content, setContent] = useState([]);
    const docRef = db.collection(coll)
    const query = docRef.where(qOne.where, qOne.condition, qOne.val)
    const compoundQuery = qTwo ? query.where(qTwo.where, qTwo.condition, qTwo.val) : null
      
    useEffect(() => {
      let q = compoundQuery ? compoundQuery : query
      let unsubscribe = q.get().then((querySnapshot) => {
        let arr = querySnapshot.docs.map(elm => elm.data())
        setContent(arr)
      }
        ).catch((error) => {
          console.log(error)
        })
      return unsubscribe
    }, [])

    return content;
}