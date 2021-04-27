import {useState, useContext} from 'react'
import { UserContext } from "../contexts/UserContext"
import { useHistory } from 'react-router-dom'
import BlogParagraph from '../components/blog-body-paragraph'

const Create = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState([])
  const [paragraph, setParagraph] = useState("")
  const history = useHistory()
  const { post, user } = useContext(UserContext)
  const author = user.displayName
  
  const handleSubmit = (e) => {
    e.preventDefault()
    let date = new Date().toLocaleDateString()
    let time = new Date().toLocaleTimeString()
    if (body.length === 0) {
      window.alert("No blog body. Please submit after adding your blog body.")
    } else {
      const blog = {title, body, author, date, time, bookmark: 0, likes: [], comments: []}
      post("blogs", blog)
      history.push('/blogs')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      setBody((prev) => [...prev, paragraph])
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
        <button type="submit">Add blog</button>
      </form>
    </div>
   );
}
 
export default Create;