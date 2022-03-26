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
        if(this.state.isAdmin === false){
            return (<BasicLayout />);
        }
        else if(this.state.isAdmin === true){
            return "Admin layout. Not implemented yet.";
        } else {
            return null;
        }
    }
}

export default Main;