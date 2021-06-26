import React, { useState, useContext, createContext } from 'react'
import DashboardActiveElement from '../../containers/dasboard-active-element-container'
import UserBlogs from '../user-blogs'
import { Container, Inner, Frame, Item, Title, Body, Hamburger, Menu, MenuList, MenuItem, MenuLink } from './styles/dashboard'

const ToggleContext = createContext()

export default function Dashboard({children, ...restProps}) {
  const [toggleActive, setToggleActive] = useState(prev => !prev && 'blogs' )
  const [menuOpen, setMenuOpen] = useState(false)
 
  const handleClick = (name) => () => {
    setToggleActive(name)
    setMenuOpen(prev => !prev)
  }

  return (
    <ToggleContext.Provider value={{toggleActive, setToggleActive, menuOpen, setMenuOpen, handleClick}}>
      <Container {...restProps}>
          <Inner>{children}</Inner> 
      </Container>
    </ToggleContext.Provider>
  )
}

Dashboard.Frame = function DashboardFrame({children, ...restProps}) {
  return <Frame {...restProps}>{children}</Frame>
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
  return <Title {...restProps}>{toggleActive.toUpperCase()}</Title>
}

Dashboard.Body = function DashboardBody({children, userLog, ...restProps}) {
  const {toggleActive} = useContext(ToggleContext)
  return <Body {...restProps}>{children}{userLog[toggleActive].map(elm => <p>{elm}</p>)}</Body>
}

Dashboard.Hamburger = function DashboardMenuButton({children, ...restProps}) {
  const {setMenuOpen, menuOpen} = useContext(ToggleContext)
  return (<Hamburger menuOpen={menuOpen} {...restProps} onClick={() => setMenuOpen(prev => !prev)}>
  </Hamburger>)
}

Dashboard.Menu = function DashboardMenu({children, left, ...restProps}) {
  const {menuOpen, setMenuOpen} = useContext(ToggleContext)
  return (<Menu menuOpen={menuOpen} onMouseLeave={() => setMenuOpen(false)} {...restProps}>
    {children}
  </Menu>)
}

Dashboard.MenuList = function DashboardMenuList({children, ...restProps}) {
  return <MenuList {...restProps}>{children}</MenuList>
}

Dashboard.MenuItem = function DashboardMenuItem({children, ...restProps}) {
  return (<MenuItem {...restProps}>
    {children}
  </MenuItem>)
}

Dashboard.MenuLink = function DashboardMenuLink({children, name, ...restProps}) {
  const {handleClick} = useContext(ToggleContext)
  return (<MenuLink name={name} onClick={handleClick(name)} {...restProps}>
    {children}
  </MenuLink>)
}