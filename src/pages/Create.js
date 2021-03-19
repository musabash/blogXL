import {useState, useContext} from 'react'
import { UserContext } from "../contexts/UserContext"
import { useHistory } from 'react-router-dom'

const Create = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [author, setAuthor] = useState('musa')
  const [isPending, setIsPending] = useState(false)
  const history = useHistory()
  const { post } = useContext(UserContext)
  const handleSubmit = (e) => {
    e.preventDefault()
    const blog = {title, body, author}
    setIsPending(true)
    post(blog)
      console.log('New blog added')
      setIsPending(false)
      history.push('/home')
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
        <label>Blog body</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <label>Author</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option>musa</option>
          <option>meryem</option>
        </select>
        {!isPending && <button>Add blog</button>}
        {isPending && <button disabled>Adding blog...</button>}
      </form>
    </div>
   );
}
 
export default Create;