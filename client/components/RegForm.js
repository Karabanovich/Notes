import React, { Component } from 'react';
import RegActions from '../actions/RegActions';
import styled from 'styled-components';
import Sign from './Sign'
import TextField from 'material-ui/TextField';
import { Switch, Route, Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
const Incorrect = styled.div`
  font-size:13px;
  color:red;
`;
const Back = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f9f9f9;
`

const Label = styled.label`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
`


const Under = styled.div`
  font-size:12px;
  display:flex;
`;
const Alr = styled.div`
  margin-right:5px;
`;

const Welcome = styled.div`
  margin-top: 100px;
  color: #303f9f; 
`
const RegF = styled.div`
  width: 260px;
  height:190px;
  padding: 17px; 
  margin-top: 15px;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
class RegForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Username: '', Password: '', errorText1: "", errorText2: '', alrEx: false, notFound: false };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.onIn = this.onIn.bind(this);
    this.onUp = this.onUp.bind(this);
    this.Reset = this.Reset.bind(this);
    this.changeError = this.changeError.bind(this);
  }

  handleChangeName(event) {
    this.setState({ Username: event.target.value });
  }
  handleChangePassword(event) {
    this.setState({ Password: event.target.value });
  }

  changeError() {
    if (this.state.Username == '')
      this.setState({ errorText1: 'This field is required' });
    else
      this.setState({ errorText1: '' });
    if (this.state.Password == '')
      this.setState({ errorText2: 'This field is required' });
    else
      this.setState({ errorText2: '' });
  }
  onIn() {
    this.changeError();
    if (this.state.Username != '' && this.state.Password != '') {
      RegActions.In(this.state).then((res) => {
        if (res){
          this.props.history.push('/Main/');
          this.props.store.dispatch({ type: 'changeUser',user:this.state.Username,folders:res})
        }
        else
          this.setState({ notFound: true })
      });

    }
  }
  onUp() {
    this.changeError();
    if (this.state.Username != '' && this.state.Password != '')
      RegActions.Up(this.state).then((res) => {
        if (res){
          this.props.history.push('/Main/');
          this.props.store.dispatch({ type: 'changeUser',user:this.state.Username,folders:res})
        }
        else
          this.setState({ alrEx: true })
      });

  }
  Reset() {
    this.setState({ errorText1: '', errorText2: '', Username: '', Password: '', notFound: false, alrEx: false });
  }
  render() {
    return (
      <Back>
        <Welcome>Welcome</Welcome>
        {
          this.state.notFound ?
            <Incorrect>Incorrect username or password.</Incorrect>
            : null
        }
        {
          this.state.alrEx ?
            <Incorrect>User already exists.</Incorrect>
            : null
        }
        <RegF>
          <Label>
            <TextField
              value={this.state.Username}
              onChange={this.handleChangeName}
              id="username"
              error={Boolean(this.state.errorText1)}
              label="Username"
              type="text"
              helperText={this.state.errorText1}
            />
          </Label>
          <Label>
            <TextField
              value={this.state.Password}
              error={Boolean(this.state.errorText2)}
              onChange={this.handleChangePassword}
              id="password"
              label="Password"
              type="password"
              helperText={this.state.errorText2}
            />
          </Label>
          <Switch>
            <Route path="/Signup/" render={props => (<div onClick={this.onUp}><Sign {...props} end="up" /></div>)} />
            <Route path="/Signin/" render={props => (<div onClick={this.onIn}><Sign {...props} end="in" /></div>)} />
          </Switch>
        </RegF>
        <div>
          <Switch>
            <Route path="/Signup/" render={props => (<div onClick={this.Reset}><Under><Alr>Already have an account?</Alr><Link to='/Signin/'>Sign in</Link></Under></div>)} />
            <Route path="/Signin/" render={props => (<div onClick={this.Reset}><Under><Alr>New to Notes?</Alr><Link to='/Signup/'>Sign up</Link></Under></div>)} />
          </Switch>
        </div>

      </Back>

    );
  }
}

export default withRouter(RegForm);