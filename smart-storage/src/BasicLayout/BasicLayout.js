import React from "react";
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link, Route, Routes } from "react-router-dom";
import { Storages } from "./Storages";
import { Items } from "./Items";

const { Header, Content, Footer } = Layout;

class BasicLayout extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                     <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    {new Array(3).fill(null).map((_, index) => {
                     const key = index + 1;
                        return <Menu.Item key={key}>Link<Link to="/register" /></Menu.Item>;
                    })}
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Routes>
                        <Route path="/storages" component={Storages}/>
                        <Route path="/items" component={Items}/>
                    </Routes>
                    <div className="site-layout-content">Content</div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Smart Storage © 2022 Created by Ant UED</Footer>
            </Layout>
        );
    }
}

export default BasicLayout;