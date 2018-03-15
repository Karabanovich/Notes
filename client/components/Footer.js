import React, { Component } from 'react';
import styled from 'styled-components';

const Footer=styled.div`
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
  align-items:center;
  border-top: 0.5px solid black;
  height: 35px;
  background-color:white;
  z-index:4;
`
export default ()=>{
  return(
    <Footer>Egor Karabanovich & Pavel Ramasheuski</Footer>
  )
}