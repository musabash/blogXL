import {useState, useContext} from 'react'
import { UserContext } from "../contexts/UserContext"
import { useHistory } from 'react-router-dom'
import BlogParagraph from '../components/blog-body-paragraph'

const Create = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState([""])
  const [paragraph, setParagraph] = useState("")
  const [isPending, setIsPending] = useState(false)
  const history = useHistory()
  const { post, user } = useContext(UserContext)
  const author = user.displayName
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const blog = {title, body, author}
    setIsPending(true)
    post(blog)
      console.log('New blog added')
      setIsPending(false)
      history.push('/home')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log("Enter key was hit.")
      setBody((prev) => [...prev, ""])
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
        <div className="blog-body" onKeyDown={handleKeyDown}>
          <label>Blog body</label>
          {body.map((elm) => 
            <BlogParagraph
            content={elm || paragraph}
            setParagraph={setParagraph}
            />
          )}
        </div>
        {!isPending && <button>Add blog</button>}
        {isPending && <button disabled>Adding blog...</button>}
      </form>
    </div>
   );
}
 
export default Create;