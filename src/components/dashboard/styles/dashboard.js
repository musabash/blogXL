import styled from 'styled-components'

export const Container = styled.div`
  margin-top: 3em;
`

export const Inner = styled.div`
  margin-top: 1em;
`
export const Frame = styled.section`
  margin-top: 1em;
`
export const Item = styled.div`
  margin-top: 1em;
`
export const Title = styled.h1`
  margin-top: 1em;
`
export const Body = styled.div`
  margin-top: 1em;
`
export const Menu = styled.nav`
  position: fixed;
  top: 5em;
  z-index: 100;
  display: flex;
  flex-direction: column;
  transition: all 250ms cubic-bezier(.5, 0, .5, 1);
  left: ${({left}) => left};
  background: #fefefe;
  padding: 0.5em 0.5em;
  box-shadow: 2px 2px 6px 1px #eeeeee;
  transform: ${({menuOpen}) => menuOpen ? "translateX(0%)" : "translateX(-100%)"};
  opacity: ${({menuOpen}) => menuOpen ? "1" : "0"};
`
export const Hamburger = styled.div`
    display: flex;
    position: fixed;
    background: transparent;
    top: 5.5em;
    left: 1.2em;
    cursor: pointer;
    height: 15px;
    width: 1.4em;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 0.2em;
    &::before {
      position: absolute;
      content: "";
      background: gray;
      width: 1.4em;
      height: 3px;
      border-radius: 1em;
      box-shadow: 0 6px 0 0 gray,
      0 -6px 0 0 gray;
      transform: ${({menuOpen}) => menuOpen && "rotate(-45deg) scaleX(0.7)"};
      box-shadow: ${({menuOpen}) => menuOpen && "0 0 0 0 gray"};
      transition: all 190ms ease-in;
    }
    &::after {
      position: absolute;
      content: "";
      background: gray;
      width: 1.4em;
      height: 3px;
      border-radius: 1em;
      transform: ${({menuOpen}) => menuOpen && "rotate(45deg) scaleX(0.7)"};
      background: ${({menuOpen}) => menuOpen && "gray"};
      transition: all 190ms ease-in;
    }
`
export const MenuList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding-left: 0;
`
export const MenuItem = styled.li`
  color: inherit;
  font-weight: 700;
  flex-basis: 100%;
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  margin: 0.2em;
`
export const MenuLink = styled.p`
  margin-top: 1em;
  &:hover{
    color: #00aeff;
  }
`