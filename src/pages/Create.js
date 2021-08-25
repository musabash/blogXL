import { useState, useContext, useMemo, useEffect, useRef } from 'react'
import { UserContext } from "../contexts/UserContext"
import { db } from '../firebase'
import { useHistory } from 'react-router'
import styled from 'styled-components'

const TextField = styled.textarea`
  width: 95%;
  height: ${({height, noOfBreaks}) => height && noOfBreaks && `calc(${height + 50}px + ${noOfBreaks * 2}ch)`};
  resize: none;
  padding: 1em 1em 0 1em;
  margin: 2% auto;
  overflow: hidden;
  border: none;
  outline:none;
  line-height: 2ch;
  text-align: ${({textAlign}) => textAlign && textAlign};
  font-size: ${({fontSize}) => fontSize ? fontSize : "1.2rem"};
  font-family: "Quicksand";
  &+div {
    font-size: ${({fontSize}) => fontSize ? fontSize : "1.2rem"};
    font-weight: 400;
    width: 95%;
    margin: 2% auto;
    padding: 1em 1em 0 1em;
    visibility: hidden;
    position: absolute;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const BlogBody = styled.section`
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  font-family: "Quicksand";
  width: 100%;
`
const SubmitButton = styled.input`
    background: rgba(246, 249, 255, 0.7);
    box-shadow: 1.2px 1.2px 2px 0.5px #b3b3b3b3,
    -0.2px -0.2px 2px 0.5px rgba(179, 179, 179, 0.7);
    color: gray;
    font-weight: 600;
    font-size: 1.2rem;
    border: 0;
    padding: 5px 8px;
    border-radius: 5px;
    cursor: not-allowed;
    margin: 0.5rem;
    letter-spacing: 0.1ch;
    width: ${({value}) => value && value.length + 4}ch;

  ${({disabled}) => !disabled && `
    color: var(--navy);
    cursor: pointer;
    &:hover{
      color: var(--hover-color);
    }
  `
  }
`

export const Create = () => {
  const [blogId, setBlogId] = useState('')
  const [isFirstClick, setIsFirstClick] = useState(true)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState("")
  const { user, updateDoc } = useContext(UserContext)
  const author = user.displayName
  const history = useHistory()
  const textRef = useRef()
  const height = useMemo(() => !isFirstLoad && textRef.current.clientHeight, [body])
  const noOfBreaks = useMemo(() => body.split(/\n|\r/).length, [body])
  useEffect(() => {
    if (!isFirstClick && title) {
      handlePost()
    }
    setIsFirstLoad(false)
  }, [isFirstClick])


  function handleBlur() {
    setIsFirstClick(false)
  }

  function handleUpdateBody() {
     title && body && updateDoc("blogs", {body: body}, blogId)
  }

  function handleOnChange(e){
    setBody(e.target.value)
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
      <Form onSubmit={handleSubmit}>
        <SubmitButton
          type="submit"
          disabled={title=== "" || body === ""}
          value="Publish"
        />
        <TextField
          required
          textAlign="center"
          fontSize="2rem"
          placeholder="Blog Title here"
          type="text"
          value={title}
          onBlur={handleBlur}
          onChange={(e) => setTitle(e.target.value)}
        />
        <BlogBody>
          <TextField
            fontSize="1.5rem"
            type="text"
            placeholder="Your Blog here"
            value={body}
            onChange={(e) => handleOnChange(e)}
            onBlur={handleUpdateBody}
            height={height}
            noOfBreaks={noOfBreaks}
          />
          <div ref={textRef}>{body}</div>
        </BlogBody>
      </Form>
    </div>
   );
}