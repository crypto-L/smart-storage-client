import React from "react";
import { Layout, Menu} from 'antd';
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Users from "./Users";
import UserStatistics from "./UserStatistics";

const { Header, Content, Footer } = Layout;

const AdminLayout = () => {
    const {state} = useLocation();

    let userStatisticsRoute = null;
    if(state !== null){
        const userId = state.userId;
        userStatisticsRoute = (<Route path="/userStatistics" element={<UserStatistics userId={userId}/>}/>);
    }

    function logOut(){
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        window.location = '/'
        window.location.reload(false);
    }

    return(
        <Layout className="Layout">
            <Header>
                <div className="logo" />
                 <Menu theme="dark" mode="horizontal" defaultSelectedKeys={'0'}>
                    <Menu.Item key={1}>Users<Link to="/users" /></Menu.Item>
                    <Menu.Item key={2} style={{marginLeft: 'auto'}} onClick={logOut}><Link to="/">Log out</Link></Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                <Routes>
                    <Route path="/users" element={<Users />} />
                    {userStatisticsRoute}
                </Routes>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Smart Storage © 2022 Created by Ant UED</Footer>
        </Layout>
    );
}
export default AdminLayout;