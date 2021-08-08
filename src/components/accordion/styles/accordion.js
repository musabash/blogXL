import styled from 'styled-components';
import { Link as ReachRouterLink  } from 'react-router-dom';

export const StyledLink = styled(ReachRouterLink)`
  box-sizing: border-box;
  transition: all 2.5s cubic-bezier(0.5, 0, 0.1, 1);
  font-size: 20px;
  font-weight: normal;
  line-height: normal;
  background: #0077b6;
  color: white;
  padding: 0.7em 0.6em;
  user-select: none;
  align-items: center;
  width: 100%;
  border-radius: 5px;
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
  box-sizing: border-box;
  cursor: pointer;
  margin-bottom: 2px;
  font-size: 26px;
  color: white;
  font-weight: normal;
  background: #03045e;
  padding: 0.7em 0.6em;
  user-select: none;
  align-items: center;
  width: 100%;
  border-radius: 5px;
  >:last-child{
    margin-left: auto;
    color: red;
  }
  
  @media (max-width: 600px) {
        font-size: 16px;
    }
`;