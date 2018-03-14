import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import styled from 'styled-components';

const Header = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #264a62;
  height: 48px;
  width: 100%;
  color:white;
  font-size:18px;
  z-index:5;
`;
const Out = styled.a` 
    text-align:center;
    position:absolute;
    top:10px;
    left:1%;
    height:30px;
    width:80px;
    cursor: pointer;
    user-select:none; 
    font-weight: 400; 
    color: #264a62; 
    text-decoration: none;
    border-radius: 3px; 
    background: white; 
    box-shadow: 0 -3px #1b4f52 inset; 
    transition: 0.2s;  
    &:hover {
        background: #4b8890; 
    } 
    &:active { 
        background: #2e5d63; 
        box-shadow: 0 3px #3b787f inset; 
    }
`

class Head extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.store.subscribe(() => {
      if (this.props.store.getState().lastAction === 'changeUser')
        this.forceUpdate()
    });
  }
  render() {
    const store = this.props.store;
    return (
      <Header>
        {store.getState().user ?
          <Out onClick={() => {
              store.dispatch({type:'changeUser',user:''});
              this.props.history.push('/Signin/');
          }}>Log out</Out>
          : null}
        <div>Notes</div>
      </Header>

    )
  }
}
export default withRouter(Head);