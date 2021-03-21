import { useState } from "react"

const BlogParagraph = ({par, index, setBody, body}) => {
  const [value, setValue] = useState(par)
  const onChangeHandler = (e) => {
    const trgt = e.target.value
    setValue(trgt)
    setBody(() => body.map((elm, i) => i === index ? elm = trgt : elm))
  }
    return (
      <>
        <textarea
          onChange={onChangeHandler}
          value={value}
        />
      </>
    );
  }
 
export default BlogParagraph;