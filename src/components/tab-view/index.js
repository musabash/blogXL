import React, { useState, useContext, createContext } from 'react'
import {BlogList} from ".."
import { Slider, Container, Inner, Frame, Wrapper, Tabs, SliderContainer, Title, Tab, Body } from './styles/tab-view'

const TabContext = createContext()

const blogListDefinitions = {
  drafts: "!blog.published",
  published: "blog.published",
  following: "userLog.following.includes(blog.authorId)",
  all: "blog.published"
}

export default function TabView({tabs, children, ...restProps}) {
  const [tab, setTab] = useState(tabs[0].name)
  const [sliderPos, setSliderPos] = useState(1)
  const tabCount = tabs.length
  return (
    <TabContext.Provider value={{tab, setTab, tabCount, sliderPos, setSliderPos}}>
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

TabView.Tab = function TabViewTab({children, name, id, ...restProps}) {
  const {tab, setTab, setSliderPos} = useContext(TabContext)
  return (
    <Tab name={name} id={id} tab={tab} onClick={() => {
      setTab(name)
      setSliderPos(() => `${id * 100}%`)
    }} {...restProps}>
      {children}
    </Tab>
  )
}

TabView.Body = function TabViewBody({children, userLog, blogs, showAuthor,...restProps}) {
  const {tab} = useContext(TabContext)
  const blogList = blogs.filter(blog => eval(blogListDefinitions[tab]))

  return (
    <Body {...restProps}>
      {children}
      {blogList.length === 0 ? `No ${tab}` : <BlogList blogs={blogList} showAuthor={showAuthor} />  }
    </Body>
  ) 
}

