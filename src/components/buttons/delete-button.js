const DeleteButton = ({id, deleteBlog}) => {

  return <button onClick={() => {
            deleteBlog("blogs", id)
          }}>delete</button>
}
export default DeleteButton;