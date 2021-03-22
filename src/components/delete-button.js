import { useHistory } from "react-router-dom"

const DeleteButton = ({id, deleteBlog}) => {
  const history = useHistory()

  return <button onClick={() => {
            deleteBlog(id)
            history.push('/home')
          }}>delete</button>
}
 
export default DeleteButton;