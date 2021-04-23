import React, { useState, useContext, createContext } from 'react'

const TabContext = createContext()

export default function TabView({children, ...restProps}) {
  const [tab, setTab] = useState('published')

  return (
    <TabContext.Provider value={{tab, setTab}}>
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
  const {tab} = useContext(TabContext)
  return <h1 className="dashboard__title" {...restProps}>{tab}</h1>
}

TabView.Tab = function TabViewTab({children, name, ...restProps}) {
  const {tab, setTab} = useContext(TabContext)
  return (
    <div name={name} className={tab === name ? 'dashboard__tab active-tab' : 'dashboard__tab'} onClick={(e) => {
      setTab(name)
    }} {...restProps}>
      {children}
    </div>
  )
}

TabView.Body = function TabViewBody({children, userLog, ...restProps}) {
  const {tab} = useContext(TabContext)
  return <div className="dashboard__body" {...restProps}>{children}{userLog[tab].map(elm => <p>{elm}</p>)}</div>
}