import styled from 'styled-components';
import { Link as ReachRouterLink  } from 'react-router-dom';

export const StyledLink = styled(ReachRouterLink)`
  box-sizing: border-box;
  transition: max-height 0.25s cubic-bezier(0.5, 0, 0.1, 1);
  font-size: 20px;
  font-weight: normal;
  line-height: normal;
  background: #0077b6;
  color: white;
  padding: 0.4em 0.6em 0.4em 0.6em;
  user-select: none;
  align-items: center;
  width: 100%;
  border-radius: 5px;
  transition: all 250ms cubic-bezier(.5, 0, .5, 1);
  text-decoration: none;
  display: block;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  
  @media (max-width: 600px) {
    font-size: 16px;
    line-height: 22px;
  }
`;

export const Container = styled.section`
  display: flex;
  border-bottom: 4px solid #222;
`;

export const Inner = styled.div`
  display: flex;
  padding: 70px 45px;
  flex-direction: column;
  max-width: 815px;
  margin: auto;
`;

export const Frame = styled.section`
  margin-bottom: 1em;
  max-width: 1200px;
`;

export const Item = styled.div`
  color: #ffffff;
  margin-bottom: 1em;
  &:first-of-type {
  margin-top: 1em;
}
`;

export const Title = styled.h1`
  font-size: 50px;
  line-height: 1.1;
  margin-top: 0;
  margin-bottom: 0.6em;
  color: rgb(255, 255, 255);
  text-align: center;
  
  @media (max-width: 600px) {
      font-size: 35px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  cursor: pointer;
  margin-bottom: 2px;
  font-size: 26px;
  color: white;
  font-weight: normal;
  background: #03045e;
  padding: 0.4em 0.6em 0.4em 0.6em;
  user-select: none;
  align-items: center;
  width: 100%;
  border-radius: 5px;
  &:span {
    color: rgb(253, 253, 253);
    font-size: 1rem;
    margin-left: 1rem;
  }
  
  @media (max-width: 600px) {
        font-size: 16px;
    }
`;