import React from 'react';
import { Link } from 'react-router-dom';
import { loginRequest } from './api/login-api';
import './Login.css';

class Login extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      nickname: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  };

  handleChange(evt){
    const value = evt.target.value;
    const state = evt.target.name;
    this.setState({[state]: value});
  };

  async handleButtonClick(){
    var token = await loginRequest(this.state.nickname, this.state.password);
    console.dir(token);
    // this.props.onLogin();
  };

  render() {
    // TODO: проверять тут токен в локал-сторадже, если есть, редирект на хоум
    return(
      <div className="Login">
      <input type="text" name='nickname' onChange={this.handleChange} value={this.state.nickname} placeholder='Nickname...'></input> 
      <br></br>
      <input type="password" name='password' onChange={this.handleChange} value={this.state.password} placeholder='Password...'></input>
      <br></br>
      <button className='Login-button' onClick={this.handleButtonClick}>Log in</button>
      <br></br>
      <Link to="/register">Register</Link>
      </div>
    );
  }
}

export default Login;
