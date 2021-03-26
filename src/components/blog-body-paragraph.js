import { useState } from "react"

const BlogParagraph = ({par, index, body, setBody}) => {
  const [value, setValue] = useState(par)
  const onChangeHandler = (e) => {
    const trgt = e.target.value
    setValue(trgt)
    setBody(() => body.map((elm, i) => i === index ? elm = trgt : elm))
  }
  
  const removePar = () => {
    setBody(() => body.filter((elm, i) => i !== index))
  }
  
    return (
      <div className="blog-paragraph-container">
        <div className="par-edit-btns">
          <button onClick={() => removePar()}>-</button>
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