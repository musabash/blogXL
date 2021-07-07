import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: ${({size}) => size};
  flex-direction: column;
  justify-content: center;
`

export const ImageContainer = styled.div`
  background: ${({photoURL}) => `lightBlue url(${photoURL}) no-repeat center center`}; 
  background-size: cover;
  border-radius: ${({borderRadius}) => borderRadius};
  height: ${({size}) => size};
  width: ${({size}) => size};
  cursor: pointer;
  text-align: center;
  border: 0.2px solid red;
  box-shadow: 0 0 0.5px 0.5px rgb(248, 133, 133),
              0 0 0.2px 0.2px rgb(221, 175, 175),
              0 0 0.5px 1px red;
`;

export const SubText = styled.div`
  margin: 0.6em 0;
  font-size: 0.8rem;
  text-align: center;
`