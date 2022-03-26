import React from 'react';
import BasicLayout from '../BasicLayout/BasicLayout';
import {isAdminCheckRequest} from './api/user-role-api';

class Main extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isAdmin: null,
        };
    }

    componentDidMount(){
        this.checkForRole();
    }

    async checkForRole(){
        var response = await isAdminCheckRequest(localStorage.getItem('userId'), localStorage.getItem('token'));
        this.setState({isAdmin: response});
    }

    render() {
        if(this.state.isAdmin !== null){
            return (<BasicLayout />);
        }
        else{
            return "Nothing loaded";
        } 
    }
}

export default Main;