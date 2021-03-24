import { useState } from "react"

const Title = ({title, setTitle}) => {
  const [value, setValue] = useState(title)
  const onChangeHandler = (e) => {
    const trgt = e.target.value
    setValue(trgt)
    setTitle(trgt)
  }
  return <input onChange={onChangeHandler} value={value}/>
}
 
export default Title;