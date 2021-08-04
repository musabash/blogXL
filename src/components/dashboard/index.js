import React, { useState, useContext, createContext} from 'react'
import { Container, Inner, Frame, Title, Body, Hamburger, Menu, MenuList, MenuItem, MenuLink, Item, ItemMenu } from './styles/dashboard'
import UserBlogs from '../user-blogs'

const ToggleContext = createContext()

export default function Dashboard({children, ...restProps}) {
  const [toggleActive, setToggleActive] = useState(prev => !prev && {name: 'blogs', title: 'Your Blogs', component: <UserBlogs /> } )
  const [menuOpen, setMenuOpen] = useState(false)
 
  const handleClick = (item) => () => {
    setToggleActive(item)
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

Dashboard.Item = function DashboardItem({children}) {
  
  const {toggleActive} = useContext(ToggleContext)
  return <Item>
    {toggleActive.component}
    {children}
  </Item>   
}

Dashboard.ItemMenu = function DashboardItemMenu({children}) {
  
  return <ItemMenu>
  ...
    {children}
  </ItemMenu>   
}


Dashboard.Title = function DashboardTitle({children, ...restProps}) {
  const {toggleActive} = useContext(ToggleContext)
  return <Title {...restProps}>{toggleActive.title.toUpperCase()}</Title>
}

Dashboard.Body = function DashboardBody({children, userLog, ...restProps}) {
  const {toggleActive} = useContext(ToggleContext)
  return <Body {...restProps}>{children}{userLog[toggleActive.name].map(elm => <p>{elm}</p>)}</Body>
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

Dashboard.MenuLink = function DashboardMenuLink({children, item, ...restProps}) {
  const {handleClick} = useContext(ToggleContext)
  return (<MenuLink item={item} onClick={handleClick(item)} {...restProps}>
    {children}
  </MenuLink>)
}