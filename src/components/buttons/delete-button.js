import { useHistory } from "react-router-dom"

const DeleteButton = ({id, deleteBlog}) => {
  const history = useHistory()

  return <button onClick={() => {
            history.push('/blogs')
            deleteBlog("blogs", id)
          }}>delete</button>
}
export default DeleteButton;