import styled from 'styled-components'

export const Container = styled.div`
  margin-top: 3em;
`

export const Inner = styled.div`

`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 99%;
`

export const SliderContainer = styled.div`
  width: 99%;
  background: rgb(217, 220, 221);
`

export const Slider = styled.div`
  align-self: baseline;
  left: 0;
  transform: ${({sliderPos}) => `translateX(${sliderPos})`};
  padding: 0.06em;
  background-image: linear-gradient(to right, transparent 5% , #444 5% 95%, transparent 95% 100%);
  border-radius: 50px;
  width: 6em;
  transition: transform 250ms cubic-bezier(.75,.23,.59,1.21);
`

export const Frame = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 99%;
`

export const Tabs = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  /* background: rgb(241, 244, 245); */
  padding-top: 1em;
`

export const Title = styled.h1`
  background: red;
`

export const Tab = styled.section`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  text-align: center;
  flex-basis: 6em;
  min-width: 6em;
  margin: 0;
  cursor: pointer;
  padding: 0.3em 0.5em;
  font-weight: ${({tab, name}) => tab === name ? 600 : 400};
`

export const Body = styled.div`
  margin-top: 1em;
`

