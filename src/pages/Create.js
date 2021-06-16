import {useState, useContext, useEffect} from 'react'
import { UserContext } from "../contexts/UserContext"
import { useHistory } from 'react-router-dom'
import BlogParagraph from '../components/blog-body-paragraph'

const Create = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState([])
  const [isDraft, setIsDraft] = useState(true)
  const [paragraph, setParagraph] = useState("")
  const history = useHistory()
  const { post, user } = useContext(UserContext)
  const author = user.displayName

  useEffect(() => {
    
    return () => {
      isDraft && handlePost(false)
    }
  }, [])

  const handlePost = (d) => {
    let date = new Date().toLocaleDateString()
    let time = new Date().toLocaleTimeString()
    post("blogs", {title, body, author, authorId: user.uid, date, time, bookmarks: [], likes: [], comments: [], published: d})
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (body.length === 0) {
      window.alert("No blog body. Please submit after adding your blog body.")
    } else {
      setIsDraft(false)
      handlePost(true)
      console.log(isDraft)
      history.push('/blogs')
    }
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