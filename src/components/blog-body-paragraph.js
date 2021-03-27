import { useState } from "react"

const BlogParagraph = ({par, index, body, setBody}) => {
  const [text, setText] = useState(par)

  const onChangeHandler = (e) => {
    const trgt = e.target.value
    setText(trgt)
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
          <button type="button" onClick={() => removePar()}>-</button>
          <button type="button" onClick={() => addPar()}>+</button>
        </div>
        <textarea
          className="blog-body-par"
          onChange={onChangeHandler}
          value={text}
        />
      </div>
    );
  }
 
export default BlogParagraph;