import React from 'react';
import { Link } from 'react-router-dom';
import { loginRequest } from './api/login-api';
import './Login.css';
import { Input, Space , Button, Alert} from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';


class Login extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      nickname: '',
      password: '',
      errorOccured: false,
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
    if(token === null){
      this.setState({
        nickname: '',
        password: '',
        errorOccured: true,
      });
    } else{
      localStorage.setItem('token', token.token);
      localStorage.setItem('userId', token.userId);
      this.props.onLogin();
    };
  };

  render() {
    // TODO: проверять тут токен в локал-сторадже, если есть, редирект на хоум
    const renderErrorBlock = () => {
      if(this.state.errorOccured){
        return (<Alert
          message="Wrong nickname or password!"
          type="error"
          showIcon
          />);
      };
    };
    
    return(
      <div className="Login">
      <Space direction="vertical">
        <Input placeholder="Nickname..." name='nickname' onChange={this.handleChange} value={this.state.nickname} />
        <Input.Password 
        name='password' onChange={this.handleChange} value={this.state.password}
        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} 
        placeholder="Password..." 
        />
        <Button onClick={this.handleButtonClick} type="primary" size="default">
          Log in
        </Button>
      </Space>
      <br></br>
      <Link to="/register">Register</Link>
      {renderErrorBlock()}
      </div>
    );
  }
}

export default Login;
