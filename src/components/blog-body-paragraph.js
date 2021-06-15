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
        <input
          className="blog-body-par"
          onBlur={onBlurHandler}
          onChange={onChangeHandler}
          value={text}
        />
      </div>
    );
  }
 
export default BlogParagraph;