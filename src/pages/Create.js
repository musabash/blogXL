import {useState, useContext, useEffect, useRef} from 'react'
import { UserContext } from "../contexts/UserContext"
import { useHistory } from 'react-router-dom'
import BlogParagraph from '../components/blog-body-paragraph'
import { db } from '../firebase'

const Create = () => {
  const [blogId, setBlogId] = useState('')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState([])
  const [isDraft, setIsDraft] = useState(true)
  const [paragraph, setParagraph] = useState('')
  const history = useHistory()
  const { user } = useContext(UserContext)
  const author = user.displayName
  const inputRef = useRef()
  const inputReff = useRef()
  
  useEffect(() => {
    
    return () => {
      isDraft && handlePost()
    }
  }, [])

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

  const handleClick = () => {
    const pos = window.getSelection().getRangeAt(0).startOffset
    // inputReff.current.focus()
    // inputReff.current.setSelectionRange(pos, pos)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      setBody(prev => [...prev, paragraph])
      setParagraph("")
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
          ref={inputRef}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="blog-body">
          <label>Blog body</label>
          {body.map((par, index) => 
            <BlogParagraph
              index={index}
              key={Math.random()}
              par={par}
              body={body}
              setBody={setBody}
            />
          )}
          <input
            value={paragraph}
            ref={inputReff}
            onChange={(e) => setParagraph(e.target.value)}
            onKeyDown={handleKeyDown}
          />  
        </div>
        <button className="publish" type="submit">Publish</button>
      </form>
      <p contenteditable="true" onClick={() => handleClick()} >blogId: {blogId}</p>
    </div>
   );
}
 
export default Create;