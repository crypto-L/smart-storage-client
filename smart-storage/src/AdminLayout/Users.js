import { Table } from "antd";
import Column from "antd/lib/table/Column";
import React from "react";
import { Link } from "react-router-dom";
import { getAllUsers } from "./api/admin-layout-api";

class Users extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            users: [],
        }

    }

    async componentDidMount(){
        let users = await getAllUsers(localStorage.getItem('userId'), localStorage.getItem('token'));
        this.setState({
            users: users,
        })
    }

    render(){
        const data = this.state.users;
        return(
            <div className="Users">
                <Table dataSource={data} rowKey='id'>
                    <Column title="Nickname" dataIndex="nickname"/>
                    <Column key="statistics" render={(user) =>(
                        <Link to={'/userStatistics'} state={{userId: user.id}}>Statistics</Link>
                    )}/>
                </Table>
            </div>
        );
    }
}

export default Users;