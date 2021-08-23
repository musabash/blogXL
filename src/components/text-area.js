import React, { useRef, useState, useEffect } from 'react'
import ReactMarkdown from "react-markdown";
import gfm from 'remark-gfm';
  
export default function TextArea({name, value, onChangeHandler}) {
  const [height, setHeight] = useState("50px")
  const hiddenTextRef = useRef()
  const textareaRef = useRef()
  

  useEffect(() => {
    hiddenTextRef && setHeight(hiddenTextRef.current.offsetHeight)
  }, [value])

  const onChange = (e) => {
    onChangeHandler({[name]: e.target.value})
  }

  return (
    <>
      <textarea
        onChange={onChange}
        ref={textareaRef}
        style={{
          height: height,
          padding: "1.5em 0",
          
        }}
        value={value}
      />
      <div ref={hiddenTextRef} style={{position: "absolute", fontSize: "2rem", visibility: "hidden", border: "1px solid blue"}}>
        <ReactMarkdown
          remarkPlugins={[gfm]}
          className="markdown"
          children={value}
        />
      </div>
      
    </>
  )
  
}