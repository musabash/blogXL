import {useState, useContext, useEffect, useRef} from 'react'
import { UserContext } from "../contexts/UserContext"
import { useHistory } from 'react-router-dom'
import { db } from '../firebase'

const Create = () => {
  const [blogId, setBlogId] = useState('')
  const [isFirstClick, setIsFirstClick] = useState(true)
  const [blog, setBlog] = useState()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState("")
  const [isDraft, setIsDraft] = useState(true)
  const history = useHistory()
  const { user } = useContext(UserContext)
  const author = user.displayName
  
  useEffect(() => {
    if (!isFirstClick && title) {
      handlePost()
    }
  }, [isFirstClick])

  useEffect(() => {
    let unsubscribe = db.collection('blogs').onSnapshot((snapshot) => {
      setBlog(snapshot.docs.map(doc => doc.data()).filter(doc => doc.id === blogId))
    })
    return (() => unsubscribe())
  }, [isFirstClick])

  function handleBlur() {
    setIsFirstClick(false)
  }

  function post(coll, blog) {
    db
    .collection(coll)
    .add(blog)
    .then((docRef) => {
      setBlogId(docRef.id)
      db.collection(coll).doc(docRef.id).update({
        id: docRef.id
      })
    })
    .catch((error) => {
    console.error("Error adding document: ", error.message)
  })
  }
  
  const handlePost = () => {
    let date = new Date().toLocaleDateString()
    let time = new Date().toLocaleTimeString()
    post("blogs", {title, body, author, authorId: user.uid, date, time, bookmarks: [], likes: [], comments: [], published: !isDraft})
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (body.length === 0) {
      window.alert("No blog body. Please submit after adding your blog body.")
    } else {
      let promise = new Promise((resolve) => resolve(setIsDraft(false)))
      promise.then(() => handlePost())
      .then(() => history.push('/blogs')) 
    }
  }

  // const handleKeyDown = (e) => {
  //   if (e.key === 'Enter') {
  //     e.preventDefault()
  //     setBody(prev => [...prev, paragraph])
  //     setParagraph("")
  //   }
  // }
   
  return ( 
    <div className="create">
      <form onSubmit={handleSubmit}>
        <label>Blog title</label>
        <input
          required
          type="text"
          value={title}
          onBlur={handleBlur}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="blog-body">
          <label>Blog body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />  
        </div>
        <button className="publish" type="submit">Publish</button>
      </form>
    </div>
   );
}
 
export default Create;