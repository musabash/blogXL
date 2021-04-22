import React, { useState, useContext, createContext } from 'react'

const TabContext = createContext()

export default function TabView({children, ...restProps}) {
  const [tabActive, setTabActive] = useState('published')

  return (
    <TabContext.Provider value={{tabActive, setTabActive}}>
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
      <div className="dashboard__tabs" {...restProps}>{children}</div>
  )
}

TabView.Title = function TabViewTitle({children, ...restProps}) {
  const {tabActive} = useContext(TabContext)
  return <h1 className="dashboard__title" {...restProps}>{tabActive}</h1>
}

TabView.Tab = function TabViewTab({children, name, ...restProps}) {
  const {tabActive, setTabActive} = useContext(TabContext)
  return (
    <div name={name} className={tabActive === name ? 'dashboard__tab active-tab' : 'dashboard__tab'} onClick={(e) => {
      setTabActive(name)
    }} {...restProps}>
      {children}
    </div>
  )
}

TabView.Body = function TabViewBody({children, userLog, ...restProps}) {
  const {tabActive} = useContext(TabContext)
  return <div className="dashboard__body" {...restProps}>{children}{userLog[tabActive].map(elm => <p>{elm}</p>)}</div>
}