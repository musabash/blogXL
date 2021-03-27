import { useState } from "react"

const BlogParagraph = ({par, index, body, setBody}) => {
  const [value, setValue] = useState(par)
  const onChangeHandler = (e) => {
    const trgt = e.target.value
    setValue(trgt)
    setBody(() => body.map((elm, i) => i === index ? elm = trgt : elm))
  }
  
  const removePar = () => {
    setBody(() => body.filter((_, i) => i !== index))
  }
  
    return (
      <div className="blog-paragraph-container">
        <div className="par-edit-btns">
          <button type="button" onClick={() => removePar()}>-</button>
          <button type="button" onClick={() => setBody((prev) => [...prev.slice(0, index + 1), "", ...prev.slice(index + 1)])}>+</button>
        </div>
        <textarea
          className="blog-body-par"
          onChange={onChangeHandler}
          value={value}
        />
      </div>
    );
  }
 
export default BlogParagraph;