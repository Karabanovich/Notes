import React from 'react';
import RegActions from '../actions/RegActions';
import './RegForm.css';
import Sign from './Sign'
import TextField from 'material-ui/TextField';
import { Switch, Route, Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import styled from 'styled-components';
function k(){
  console.log('s');
}
const Back=styled.div`
  margin-top: 48px;
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f9f9f9;
`

const Label=styled.label`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
`


const Under=styled.div`
  font-size:12px;
  display:flex;
`;
const Alr=styled.div`
  margin-right:5px;
`;

class RegForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Username: '', Password: '',errorText:""};

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.onIn = this.onIn.bind(this);
    this.onUp = this.onUp.bind(this);
    this.Reset = this.Reset.bind(this);
  }

  handleChangeName(event) {
    this.setState({ Username: event.target.value });
  }
  handleChangePassword(event) {
    this.setState({ Password: event.target.value });
  }

  handleSubmit(event) {
    RegActions.Reg(this.state);
    event.preventDefault();
  }
  onIn(){
    if(this.state.Username!=''&&this.state.Password!='')
      RegActions.In(this.state);
    else 
      this.setState({errorText:'This field is required'});

  }
  onUp(){
    if(this.state.Username!=''&&this.state.Password!='')
      RegActions.Up(this.state);
    else 
      this.setState({errorText:'This field is required'});
  }
  Reset(){
    this.setState({errorText:'',Username:'',Password:''});
  }
  render() {
    return (
      <Back>
        <div className="welcome">Welcome</div>
        <div className="RegForm">
          <Label>
            <TextField
              value={this.state.Username}
              onChange={this.handleChangeName}
              id="username"
              error={Boolean(this.state.errorText)}
              label="Username"
              type="text"
              helperText={this.state.errorText}
            />
          </Label>
          <Label>
            <TextField
              value={this.state.Password}
              error={Boolean(this.state.errorText)}
              onChange={this.handleChangePassword}
              id="password"
              label="Password"
              type="password"
              helperText={this.state.errorText}
            />
          </Label>
          <Switch>
            <Route path="/Signup/" render={props => (<div onClick={this.onUp}><Sign {...props} end="up" /></div>)} />
            <Route path="/Signin/" render={props => (<div onClick={this.onIn}><Sign {...props} end="in"/></div>)} />
          </Switch>
        </div>
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