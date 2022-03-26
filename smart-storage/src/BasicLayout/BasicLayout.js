import React from "react";
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link, Route, Routes } from "react-router-dom";
import Storages from "./Storages";
import { Items } from "./Items";
import './index.css';

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
                     <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key={1}>Storages<Link to="/storages" /></Menu.Item>
                        <Menu.Item key={2}>Items<Link to="/items" /></Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <div className="site-layout-content">
                    <Routes>
                        <Route path="/storages" element={<Storages/>}/>
                        <Route path="/items" element={<Items />}/>
                    </Routes>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Smart Storage © 2022 Created by Ant UED</Footer>
            </Layout>
        );
    }
}

export default BasicLayout;