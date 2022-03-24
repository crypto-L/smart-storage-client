import React from 'react';
import './Register.css';
import {registerRequest} from './api/register-api.js';
import { Link } from 'react-router-dom';

class Register extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
          nickname: '',
          password: '',
          isRegistered: false,
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
        const nick = this.state.nickname;
        const pass = this.state.password;
        const user = await registerRequest(nick, pass).catch(error => console.log(error.response.data));

        if(user.constructor.name === "User"){
            this.setState({isRegistered: true});
        };
        
    };

    render() {
        if(this.state.isRegistered){
            return(
                <div className="Register">
                    <p>Congratulations, {this.state.nickname}! You have been successfully registered.</p>
                    <p>Click <Link to="/">here</Link> to go to the login page.</p>
                </div>
            );
        };
        return(
            <div className="Register">
            <input type="text" name='nickname' onChange={this.handleChange} value={this.state.nickname} placeholder='Enter nickname'></input> 
            <br></br>
            <input type="password" name='password' onChange={this.handleChange} value={this.state.password} placeholder='Enter password'></input>
            <br></br>
            <button className='Register-button' onClick={this.handleButtonClick}>Register Now</button>
            <br></br>
            </div>
        );
    };
};

export default Register;