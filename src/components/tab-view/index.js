import React, { useState, useContext, createContext } from 'react'
import styled from 'styled-components'
import BlogList from "../blog-list"

const Slider = styled.div`
  align-self: baseline;
  left: 0;
  transform: ${({sliderPos}) => `translateX(${sliderPos})`};
  padding: 0.06em;
  background-image: linear-gradient(to right, transparent 5% , #444 5% 95%, transparent 95% 100%);
  border-radius: 50px;
  width: 6em;
  transition: transform 250ms cubic-bezier(.5, 0, .5, 1);
`
const TabContext = createContext()

export default function TabView({tabs, children, ...restProps}) {
  const [tab, setTab] = useState(tabs[0].name)
  const [sliderPos, setSliderPos] = useState(1)
  const tabCount = tabs.length
  return (
    <TabContext.Provider value={{tab, setTab, tabCount, sliderPos, setSliderPos}}>
      <div className="dashboard__container" {...restProps}>
          <div className="dashboard__inner">{children}</div> 
      </div>
    </TabContext.Provider>
  )
}

TabView.Frame = function TabViewFrame({children, ...restProps}) {
  return <section className="dashboard__frame" {...restProps}>{children}</section>
}

TabView.Tabs = function TabViewTabs({children, ...restProps}) {
  return (
    <div className="tabs-container">
      <div className="dashboard__tabs" {...restProps}>{children}
      </div>
    </div>  
  )
}

TabView.Slider = function TabViewSlider({...restProps}) {
  const {sliderPos} = useContext(TabContext)
  return <div className="slider-container">
  <Slider sliderPos={sliderPos} {...restProps} />
  </div>
}

TabView.Title = function TabViewTitle({children, ...restProps}) {
  const {tab} = useContext(TabContext)
  return <h1 className="dashboard__title" {...restProps}>{tab.toUpperCase()}</h1>
}

TabView.Tab = function TabViewTab({children, name, id, ...restProps}) {
  const {tab, setTab, setSliderPos} = useContext(TabContext)
  return (
    <div name={name} id={id} className={tab === name ? 'dashboard__tab active-tab' : 'dashboard__tab'} onClick={() => {
      setTab(name)
      setSliderPos(() => `${id * 100}%`)
    }} {...restProps}>
      {children}
    </div>
  )
}

TabView.Body = function TabViewBody({children, userLog, blogs, ...restProps}) {
  const {tab} = useContext(TabContext)
  const blogList = tab === "drafts" ? blogs.filter(blog => !blog.published) : blogs.filter(blog => blog.published)

  return (
    <div className="dashboard__body" {...restProps}>
      {children}
      {blogList.length === 0 ? `No ${tab}` : <BlogList blogs={blogList} />  }
    </div>
  ) 
}