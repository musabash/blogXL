import React from "react"
import { Nav, InnerListItem, Link, Title, Logo, MenuContainer} from "./styles/header"
import UserMenu from "../user-menu"

function Header() {
  return(
    <Nav>
      <Link to='/'>
        <InnerListItem>
          <Title>BlogXL</Title>
          <Logo/>
        </InnerListItem>
      </Link>
      <MenuContainer>
        <UserMenu />
      </MenuContainer>
    </Nav>
  )
}

export default Header