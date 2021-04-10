import React, { useState, useContext, createContext } from 'react'

const ToggleContext = createContext()

export default function Accordion({children, ...restProps}) {
  return (
    <section className="accordion__container" {...restProps}>
     <div className="accordion__inner">{children}</div> 
    </section>
  )
}

Accordion.Frame = function AccordionFrame({children, ...restProps}) {
  return <section className="accordion__frame" {...restProps}>{children}</section>
}

Accordion.Item = function AccordionItem({children, ...restProps}) {
  const [toggleShow, setToggleShow] = useState(false)
  return (
    <ToggleContext.Provider value={{toggleShow, setToggleShow}}>
      <div className="accordion__item" {...restProps}>{children}</div>
    </ToggleContext.Provider>
  )
}

Accordion.Title = function AccordionTitle({children, ...restProps}) {
  return <h1 className="accordion__title" {...restProps}>{children}</h1>
}

Accordion.Header = function AccordionHeader({children, ...restProps}) {
  const {toggleShow, setToggleShow} = useContext(ToggleContext)
  return (
    <div className="accordion__header" onClick={() => setToggleShow(!toggleShow)} {...restProps}>
      {children}
      {
        toggleShow ? <span>▲</span> :
                     <span>▼</span>
      }
    </div>
  )
}

Accordion.Body = function AccordionBody({children, ...restProps}) {
  const {toggleShow} = useContext(ToggleContext)
  return toggleShow ? <div className="accordion__body" {...restProps}>{children}</div> : null
}