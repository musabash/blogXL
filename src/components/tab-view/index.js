import React, { useState, useContext, createContext, useEffect } from 'react'
import {BlogList} from ".."
import { Slider, Container, Inner, Frame, Wrapper, Tabs, SliderContainer, Title, Tab, Body } from './styles/tab-view'

const TabContext = createContext()

export default function TabView({tabs, children, ...restProps}) {
  const [tab, setTab] = useState(tabs[0].name)
  const [blogDef, setBlogDef] = useState(tabs[0].def)
  const [sliderPos, setSliderPos] = useState(1)
  const tabCount = tabs.length
  return (
    <TabContext.Provider value={{tab, setTab, tabCount, sliderPos, setSliderPos, blogDef, setBlogDef}}>
      <Container {...restProps}>
          <Inner>{children}</Inner> 
      </Container>
    </TabContext.Provider>
  )
}

TabView.Frame = function TabViewFrame({children, ...restProps}) {
  return <Frame{...restProps}>{children}</Frame>
}

TabView.Tabs = function TabViewTabs({children, ...restProps}) {
  return (
    <Wrapper>
      <Tabs {...restProps}>{children}
      </Tabs>
    </Wrapper>  
  )
}

TabView.Slider = function TabViewSlider({...restProps}) {
  const {sliderPos} = useContext(TabContext)
  return <SliderContainer>
    <Slider sliderPos={sliderPos} {...restProps} />
  </SliderContainer>
}


TabView.Title = function TabViewTitle({children, ...restProps}) {
  const {tab} = useContext(TabContext)
  return <Title {...restProps}>{tab.toUpperCase()}</Title>
}

TabView.Tab = function TabViewTab({children, name, def, id, ...restProps}) {
  const {tab, setTab, setSliderPos, setBlogDef} = useContext(TabContext)
  return (
    <Tab name={name} id={id} tab={tab} def={def} onClick={() => {
      setTab(name)
      setBlogDef(def)
      setSliderPos(() => `${id * 100}%`)
    }} {...restProps}>
      {children}
    </Tab>
  )
}

TabView.Body = function TabViewBody({children, userLog, blogs, showAuthor,...restProps}) {
  const {tab, blogDef} = useContext(TabContext)
  const [blogList, setBlogList] = useState([])
  
  useEffect(() => {
    blogs && setBlogList(blogs.filter(blog => eval(blogDef)))
  }, [blogDef, blogs])

  return (
    <Body {...restProps}>
      {children}
      {blogList.length === 0 ? `No ${tab}` : <BlogList blogs={blogList} showAuthor={showAuthor} />  }
    </Body>
  ) 
}

