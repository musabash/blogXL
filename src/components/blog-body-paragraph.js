import { useState } from "react"
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa"

const BlogParagraph = ({par, index, body, setBody}) => {
  const [text, setText] = useState(par)

  const onChangeHandler = (e) => {
    e.target.value.length === 0 ? removePar() : setText(e.target.value)
  }

  const onBlurHandler = (e) => {
    const trgt = e.target.value
    setBody((prev) => prev.map((elm, i) => i === index ? trgt : elm))
    trgt.length === 0 ? removePar() : setText(trgt)
  }
  
  const removePar = () => {
    setBody(() => body.filter((_, i) => i !== index))
  }

  const addPar = () => {
    setBody((prev) => [...prev.slice(0, index + 1), "", ...prev.slice(index + 1)].map((elm, i) => i === index ? elm = text : elm))
  }
  
    return (
      <div className="blog-paragraph-container">
        <div className="par-edit-btns">
          <FaMinusCircle onClick={() => removePar()} />
          <FaPlusCircle onClick={() => addPar()} />
        </div>
        <p
          contenteditable="true"
          className="blog-body-par"
          onBlur={onBlurHandler}
        >{par}</p>
      </div>
    );
  }
 
export default BlogParagraph;