import {useState, useContext, useEffect, useRef} from 'react'
import { UserContext } from "../contexts/UserContext"
import { useHistory } from 'react-router-dom'
import BlogParagraph from '../components/blog-body-paragraph'

const Create = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState([])
  const [paragraph, setParagraph] = useState("")
  const [published, setPublished] = useState(false)
  const isFirstRun = useRef(true)
  const history = useHistory()
  const { post, user } = useContext(UserContext)
  const author = user.displayName
  
  
  const handlePost = (d) => {
    let date = new Date().toLocaleDateString()
    let time = new Date().toLocaleTimeString()
    const blog = {title, body, author, authorId: user.uid, date, time, bookmark: [], likes: [], comments: [], published: d}
    post("blogs", blog)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setPublished(true)
    if (body.length === 0) {
      window.alert("No blog body. Please submit after adding your blog body.")
    } else {
      handlePost(true)
      history.push('/blogs')
    }
  }

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
    }

    return () => {
      if (!published && body.length !== 0) {
        handlePost(false)
        console.log(body)
      }
    } 
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      setBody(prev => [...prev, paragraph])
      console.log(body)
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
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="blog-body">
          <label>Blog body</label>
          {body.map((par, index) => 
            <BlogParagraph
              index={index}
              par={par}
              body={body}
              setBody={setBody}
            />
          )}
          <input
            value={paragraph}
            onChange={(e) => setParagraph(e.target.value)}
            onKeyDown={handleKeyDown}
          />  
        </div>
        <button className="publish" type="submit">Publish</button>
      </form>
    </div>
   );
}
 
export default Create;