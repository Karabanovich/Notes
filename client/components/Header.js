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
const Books = styled.i` 
    position:absolute;
    top:12px;
    left:3%;
    cursor: pointer;
    color:#ffffff73;
    user-select:none;   
    &:hover {
      color:white;
    } 
`
const Out = styled.i` 
position:absolute;
top:12px;
right:3%;
color:#ffffff73;
cursor: pointer;
user-select:none;   
&:hover {
  color:white;
} 

`

class Head extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.unsubscribe=this.props.store.subscribe(() => {
      let a = this.props.store.getState().lastAction;
      if (this.refs.header && (a === 'changeUser' || a === 'mobile'))
        this.forceUpdate()
    });
  }
  componentWillUnmount(){
    this.unsubscribe();
  }
  render() {
    const store = this.props.store;
    return (
      <Header ref='header'>
        {store.getState().user && store.getState().isMobile ?
          <Books className="material-icons" onClick={() => {
            store.dispatch({ type: 'dispBooks', disp: !store.getState().books });
          }}>menu</Books>
          : null
        }
        {store.getState().user ?
          <Out className="material-icons" onClick={() => {
            store.dispatch({ type: 'changeUser', user: '' });
            this.props.history.push('/Signin/');
          }}>exit_to_app</Out>
          : null}
        <div>Notes</div>
      </Header>

    )
  }
}
export default withRouter(Head);