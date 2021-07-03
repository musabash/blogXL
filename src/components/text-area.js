import React, { useRef, useState, useEffect } from 'react'
import ReactMarkdown from "react-markdown";
import gfm from 'remark-gfm';
  
export default function TextArea({value, onChangeHandler}) {
  const [height, setHeight] = useState("50px")
  const hiddenTextRef = useRef()
  const textareaRef = useRef()
  

  useEffect(() => {
    hiddenTextRef && setHeight(hiddenTextRef.current.offsetHeight)
  }, [value])

  const onChange = (e) => {
    onChangeHandler({body: e.target.value})
  }

  return (
    <>
      <textarea
        onChange={onChange}
        ref={textareaRef}
        style={{
          height: height
        }}
        value={value}
      />
      <div ref={hiddenTextRef} style={{position: "absolute", fontSize: "2.5rem", visibility: "hidden"}}>
        <ReactMarkdown
          remarkPlugins={[gfm]}
          className="markdown"
          children={value}
        />
      </div>
      
    </>
  )
  
}