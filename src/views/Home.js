import React from 'react';
import Header from './layouts/Header';
import Body from './layouts/Body';
import styled from "styled-components";

const HomeWrapper = styled.div`
`


const Home = () => {
  return (
    <HomeWrapper>
        <Header/>
        <Body/>
    </HomeWrapper>
  )
}

export default Home