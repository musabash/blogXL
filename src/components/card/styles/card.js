import styled from "styled-components";
import {Link as ReachRouterLink} from 'react-router-dom'

export const Title = styled.h2`
    font-size: 24px;
    font-weight: bold;
    margin: 0.6em auto;
    font-size: 24px;
    color: #f1356d;
  }
`;

export const Container = styled.div`
    background: #eeeeee1a;
    padding: 10px 20px 0;
    margin: 20px 0 0;
    width: 100%;
    height: 100%;
    max-width: 23em;
    box-shadow: 0 0 2px 0 #c3c3c3;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    }
    
    &:last-of-type {
        margin-bottom: 0;
    }

    &:hover {
      background: #fff;
      box-shadow: 1px 3px 10px rgba(0,0,0,0.1),
                  -1px -3px 10px rgba(0,0,0,0.1);
    }
`;

export const Link = styled(ReachRouterLink)`
  color: #a0a0a0;
  text-decoration: none;
  margin-left: 1ch;
  &:hover {
      text-shadow: 0 0 0.5px red;
      color: #b0b0b0;
  }
`;

export const NoLink = styled.div`
  color: #a0a0a0;
  text-decoration: none;
  margin-left: 1ch;
  &:hover {
      color: #b0b0b0;
  }
`;

export const Meta = styled.div`
    display: none;
    position: absolute;
    bottom: 0;
    padding: 10px;
    background-color: #0000008f;
`;

export const Group = styled.div`
    display: flex;
    flex-direction: ${({ column }) => column ?
     'column' : 'row'};
    ${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent}`};
    ${({ margin }) => margin && `margin: ${margin}`};
    &:last-of-type{margin-bottom: 0.6em;}
    align-items: center;
`;

export const Text = styled.p`
    margin-left: 0.6em;
    font-size: 1rem;
    color: gray;
    margin-bottom: 0;
    user-select: none;
    line-height: normal;
`;

export const SmallText = styled.h5`
    color: gray;
    font-family: 'Crimson', sans-serif;
    margin-bottom: 0;
    user-select: none;
    line-height: normal;
    letter-spacing: 0.05rem;
`;

export const Restore = styled.p`
  font-weight: 600;
  &:hover{
    color: #00aeff;
    cursor: pointer;
  }
`