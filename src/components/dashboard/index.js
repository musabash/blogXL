import React, { useState, useContext, createContext } from 'react'
import DashboardActiveElement from '../dasboard-active-element'
import UserBlogs from '../user-blogs'

const ToggleContext = createContext()

export default function Dashboard({children, ...restProps}) {
  const [toggleActive, setToggleActive] = useState('bookmarks')
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <ToggleContext.Provider value={{toggleActive, setToggleActive, menuOpen, setMenuOpen}}>
      <div className="dashboard__container" {...restProps}>
          <div className="dashboard__inner">{children}</div> 
      </div>
    </ToggleContext.Provider>
  )
}

Dashboard.Frame = function DashboardFrame({children, ...restProps}) {
  return <section className="dashboard__frame" {...restProps}>{children}</section>
}

Dashboard.Tabs = function DashboardTabs({children, ...restProps}) {
  return (
      <div className="dashboard__tabs" {...restProps}>{children}</div>
  )
}

Dashboard.Item = function DashboardItem({children, ...restProps}) {
  
  const {toggleActive} = useContext(ToggleContext)
  return (
    toggleActive === "blogs" ?
    <UserBlogs {...restProps}/> :
    <DashboardActiveElement toggleActive={toggleActive} {...restProps}/>
  )
}

Dashboard.Title = function DashboardTitle({children, ...restProps}) {
  const {toggleActive} = useContext(ToggleContext)
  return <h1 className="dashboard__title" {...restProps}>{toggleActive}</h1>
}

Dashboard.Tab = function DashboardTab({children, name, ...restProps}) {
  const {toggleActive, setToggleActive} = useContext(ToggleContext)
  return (
    <div name={name} className={toggleActive === name ? 'dashboard__tab active-tab' : 'dashboard__tab'} onClick={(e) => {
      setToggleActive(name)
    }} {...restProps}>
      {children}
    </div>
  )
}

Dashboard.Body = function DashboardBody({children, userLog, ...restProps}) {
  const {toggleActive} = useContext(ToggleContext)
  return <div className="dashboard__body" {...restProps}>{children}{userLog[toggleActive].map(elm => <p>{elm}</p>)}</div>
}

Dashboard.MenuButton = function DashboardMenuButton({children, ...restProps}) {
  const {setMenuOpen, menuOpen} = useContext(ToggleContext)
  return (<div className={menuOpen ? "hamburger cross" : "hamburger"} {...restProps} onMouseEnter={() => setMenuOpen(true)} onClick={() => setMenuOpen(prev => !prev)}>
  </div>)
}

Dashboard.Menu = function DashboardMenu({children, ...restProps}) {
  const {menuOpen, setMenuOpen} = useContext(ToggleContext)
  return (<nav onMouseLeave={() => setMenuOpen(false)} className={menuOpen ? "dashboard__menu dashboard__menu-open" : "dashboard__menu"} {...restProps}>
    {children}
  </nav>)
}

Dashboard.MenuList = function DashboardMenuList({children, ...restProps}) {
  return <ul className="dashboard__menu__list" {...restProps}>{children}</ul>
}

Dashboard.MenuItem = function DashboardMenuItem({children, ...restProps}) {
  return (<li className="dashboard__menu__item" {...restProps}>
    {children}
  </li>)
}

Dashboard.MenuLink = function DashboardMenuLink({children, name, ...restProps}) {
  const {setToggleActive, setMenuOpen} = useContext(ToggleContext)
  return (<p name={name} className="dashboard__menu__link" onClick={() => {
    setToggleActive(name)
    setMenuOpen(prev => !prev)
  }} {...restProps}>
    {children}
  </p>)
}