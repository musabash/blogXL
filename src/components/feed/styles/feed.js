import styled from "styled-components";
import {Link as ReachRouterLink} from 'react-router-dom'

export const Title = styled.p`
    font-size: 24px;
    color: #b0b0b0;
    font-weight: bold;
    margin-left: 56px;
    margin-right: 56px;
    margin-top: 0;
  }
`;

export const Link = styled(ReachRouterLink)`
  color: #a0a0a0;
  text-decoration: none;
  margin-left: 1ch;
  &:hover {
      text-shadow: 0 0 0.5px black;
  }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1em;
    margin-bottom: 50px;
    box-sizing: border-box;
    
    > ${Title} {
        @media (max-width: 1000px) {
            margin-left: 30px;
        }
    }
    
    &:last-of-type {
        margin-bottom: 0;
    }
`;

export const Group = styled.div`
    display: grid;
    justify-items: start;
    align-items: start;
    grid-template-columns: repeat(auto-fill, minmax(19em, 1fr));
    gap: 1em;
    padding-top: 2em;
    padding-botom: 0;
`;

export const SubTitle = styled.p`
    font-size: 12px;
    color: white;
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 0;
    user-select: none;
    display: none;
`;

export const Entities = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 1em;
`;

export const Meta = styled.div`
    display: none;
    position: absolute;
    bottom: 0;
    padding: 10px;
    background-color: #0000008f;
`;

export const Image = styled.img`
    border: 0;
    width: 100%;
    max-width: 305px;
    cursor: pointer;
    height: auto;
    padding: 0;
    margin: 0;
`;

export const FeatureText = styled.p`
    font-size: 18px;
    color: white;
    font-weight: ${({ fontWeight }) => fontWeight === 'bold' ? 'bold' : 'normal'};
    margin: 0;
    
    @media (max-width: 800px) {
        line-height: 22px;
    }
`;

export const Item = styled.div`
    display: flex;
    background: black;
    flex-direction: column;
    margin-right: 5px;
    position: relative;
    cursor: pointer;
    transition: transform 0.2;
    
    &:hover {
        transform: scale(1.1);
        z-index: 99;
    }
    
    @media (min-width: 1000px) {
        &:hover ${Meta}, &:hover ${FeatureText}, &:hover ${SubTitle} {
            display: block;
            z-index: 100;
        }
    }
    
    &:first-of-type {
        margin-left: 56px;
        
        @media (max-width: 1000px) {
            margin-left: 30px;
        }
    }
    
    &:last-of-type {
        margin-right: 56px;
        
        @media (max-width: 1000px) {
            margin-right: 30px;
        }
    }
`;

export const Feature = styled.div`
    display: flex;
    padding: 1em;
    flex-direction: row;
    background: url(${({ src }) => src});
    background-size: contain;
    position: relative;
    height: 360px;
    color: white;
    background-position-x: right;
    background-repeat: no-repeat;
    background-color: gray;
    
    @media (max-width: 1000px) {
        height: auto;
        background-size: auto;
        
        ${Title} {
            font-size: 20px;
            line-height: 20px;
            margin-bottom: 10px;
        }
        ${FeatureText} {
            font-size: 14px;
        }
    }
`;

export const FeatureTitle = styled(Title)`
    margin-left: 0;
`;

export const FeatureClose = styled.button`
    color: white;
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    
    img {
        filter: brightness(0) invert(1);
        width: 24px;
    }
`;

export const Content = styled.div`
    margin: 56px;
    max-width: 500px;
    line-height: normal;
    
    @media (max-width: 1000px) {
        margin: 30px;
        max-width: none;
    }
`;