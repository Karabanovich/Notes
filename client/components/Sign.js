import React from 'react';
import styled from 'styled-components';
const Button=styled.button`
  background: ${props => props.children[1]=="in" ? '#4ad069' : '#3f6b88'};
  width:100%;
  border:none;
  border-radius: 7px;
  height:25px;
  color:white;
  transition-duration: 0.4s;
  &:hover {
    background: ${props => props.children[1]=="in" ? '#289040' : '#264a62'};
    cursor:pointer;
  }
`;
export default (props)=>{
    return(
        
        <Button>Sign {props.end}</Button>

    )
}