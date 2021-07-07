import { useState, useContext, useEffect } from 'react'
import { UserContext } from "../contexts/UserContext"
import { db } from '../firebase'
import { useHistory } from 'react-router'

const Create = () => {
  const [blogId, setBlogId] = useState('')
  const [isFirstClick, setIsFirstClick] = useState(true)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState("")
  const { user, updateDoc } = useContext(UserContext)
  const author = user.displayName
  const history = useHistory()
  
  useEffect(() => {
    if (!isFirstClick && title) {
      handlePost()
    }
  }, [isFirstClick])

  function handleBlur() {
    setIsFirstClick(false)
  }

  function handleUpdateBody() {
     updateDoc("blogs", {body: body}, blogId)
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
    post("blogs", {title, body, author, authorId: user.uid, date, time, bookmarks: [], likes: [], comments: [], published: false})
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (body.length === 0) {
      window.alert("No blog body. Please submit after adding your blog body.")
    } else {
      updateDoc("blogs", {body: body, published: true}, blogId)
      history.goBack()
    }
  }
   
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
            onBlur={handleUpdateBody}
          />  
        </div>
        <button className="publish" type="submit">Publish</button>
      </form>
    </div>
   );
}
 
export default Create;