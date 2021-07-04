import styled from 'styled-components';

export const Container = styled.div`
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