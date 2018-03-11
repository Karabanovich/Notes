import React, { Component } from 'react';

import styled from 'styled-components';

const Header=styled.div`
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #303f9f;
  height: 48px;
  width: 100%;
  color:white;
  font-size:18px;
  z-index:5;
`;


export default ()=>{
  return(
    <Header>Notes</Header>
  )
}
