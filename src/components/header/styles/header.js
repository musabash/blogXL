import styled from "styled-components";
import { Link as ReachRouterLink } from 'react-router-dom';

export const Nav = styled.ul`
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  list-style: none;
  box-shadow: 0 0 5px 1px rgb(207, 207, 207);
  background: whitesmoke;
  position: fixed;
  top: 0;
  width: 100%;
  padding: 1em 1em;
  z-index: 10;
`

export const Link = styled(ReachRouterLink)`
  color: #fff;
  text-decoration: none;
  margin-left: 1ch;
  &:hover {
      text-decoration: underline;
  }
`;

export const InnerListItem = styled.li`
  display: flex;
  align-items: baseline;
`

export const Title = styled.div`
  font-family: 'Orbitron';
  font-size: 1rem;
`

export const Logo = styled.div`
  width: 41px;
  height: 41px;
  position: relative;
  margin-right: 1em;
  margin-bottom: 0.5em;
  color: var(--logo);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;


  &::after {
    background: var(--logo-background);
    position: absolute;
    border-radius: 2px;
    transform: rotate(45deg);
    content: '';
    width: 13px;
    height: 13px;
    background: yellow;
    box-shadow: 8px 8px 0 0 red,
                -8px -8px 0 0 green,
                -8px 8px 0 0 blue,
                8px -8px 0 0 orange,
                0 0 10px 7px white;
  }
  &::before{
    left: 40px;
    background: var(--logo-background);
    position: absolute;
    border-radius: 2px;
    content: '';
    width: 13px;
    height: 13px;
    background: transparent;
    box-shadow: 13px 0px 0 0 gray,
                13px -13px 0 0 gray;
  }
`

export const MenuContainer = styled.li`

`