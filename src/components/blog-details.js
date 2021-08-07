import { useParams, useHistory } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import {useContext, useReducer, useState, useEffect} from "react"
import {InteractionBarContainer, EditButtonsContainer} from "../containers"
import { db } from "../firebase"
import ReactMarkdown from "react-markdown";
import gfm from 'remark-gfm';
import TextArea from "./text-area"
import MetaData from "./meta-data"

export const BlogDetails = () => {
  const [blog, setBlog] = useState('')
  const [error, setError] = useState(null)
  const { id } = useParams()
  const { deleteBlog, updateDoc, user, moveToBin } = useContext(UserContext)
  const history = useHistory();
  const authorised = user ? user.uid === blog.authorId : false

  useEffect(() => {
    const docRef = db.collection('blogs').doc(id)
    docRef.get().then((doc) => {
    if (doc.exists) {
      let unsubscribe = db.collection('blogs').onSnapshot((snapshot) => {
        const data = snapshot.docs.filter(doc => doc.id === id)[0]
        data && setBlog(data.data())
      })
      return (() => unsubscribe())
    } else {
        setError("There is no such document!")
        setTimeout(() => history.goBack(), 2000)
    }})
  }, [])

  useEffect(() => {
    if (blog) {
      dispatch({type: 'ON_CHANGE', payload: {title: blog.title, body: blog.body, isPublished: blog.published}})
    }
  }, [blog])

  function onChangeHandler(obj) {
    dispatch({type: 'ON_CHANGE', payload: obj})    
  }

  let [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'HANDLE_EDIT': 
        return { ...state, body: blog.body, isEditable: !state.isEditable }
      
      case 'HANDLE_UPDATE': 
        const obj = {title: state.title, body: state.body, published: state.isPublished}
        updateDoc("blogs", obj, id)
        return {
          ...state,
          isEditable: !state.isEditable
        }
      case 'HANDLE_DELETE': {
        moveToBin("blogs", id)
        history.goBack()
        return state
      }

      case 'ON_CHANGE': 
        return {
          ...state,
          ...action.payload
        }

      case 'PUBLISH':
        updateDoc("blogs", {published: true}, id)
        return {
          ...state,
          isPublished: true
        }

      default:
        return state
    }
  }, {
    isEditable: false,
    body: "",
    isPublished: "",
    title: ""
  })
  
  return (
    error ? <p>{error}</p> : <>
      <InteractionBarContainer 
        history={history}
        blog={blog}
        authorised={authorised}
      />
      <div className="blog-details">
        <EditButtonsContainer 
          isEditable={state.isEditable} 
          handleEdit={() => dispatch({type: 'HANDLE_EDIT'})}
          id={id}
          published={state.isPublished}
          authorised={authorised}
          handleDelete={() => dispatch({type: 'HANDLE_DELETE'})}
          handleUpdate={() => dispatch({type: 'HANDLE_UPDATE'})}
        />         
        <article>
          <MetaData
            span={blog.author} 
            dataPrimary="Written by"
            dataSecondary={blog.date}
          />
          {
            state.isEditable 
            ?
            <div className="blog-title">
              <TextArea
                name="title"
                value={state.title}
                onChangeHandler={onChangeHandler}
              />
            </div>
            :
            <ReactMarkdown 
              remarkPlugins={[gfm]}
              className="markdown"
              children={state.title} 
              components={{p: 'h1'}}
            />
          }         

          <div className="blog-body">
            {
              state.isEditable
              ?
              <TextArea
                name="body"
                value={state.body}
                onChangeHandler={onChangeHandler}
              />
              :
              <ReactMarkdown
                remarkPlugins={[gfm]}
                className="markdown"
                children={state.body}
              />
            }
          </div>
        </article>
      </div>
    </>
   );
}