import React, { useEffect, useState } from "react";
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link, Route, Routes } from "react-router-dom";
import Storages from "./Storages";
import { Items } from "./Items";
import './index.css';
import { useLocation } from "react-router-dom";
import AddNewItem from "./AddNewItem";

const { Header, Content, Footer } = Layout;

const BasicLayout = () => {
    const {state} = useLocation();
    let storageRoute = null;
    let addNewItemRoute = null;
    
    if(state === null){
        storageRoute = (<Route path="/storages" element={<Storages/>}/>);
    }
    else {
        const storageId = state.storageId;
        addNewItemRoute = <Route path="/addNewItem" element={<AddNewItem storageId={storageId}/>}/>
        storageRoute = <Route path="/storages" element={<Storages storageId={storageId}/>}/>
    }

    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                 <Menu theme="dark" mode="horizontal" defaultSelectedKeys={'0'}>
                    <Menu.Item key={1}>Storages<Link to="/storages" /></Menu.Item>
                    <Menu.Item key={2}>Items<Link to="/items" /></Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                <Routes>
                    {storageRoute}
                    <Route path="/items" element={<Items />}/>
                    {addNewItemRoute}
                </Routes>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Smart Storage © 2022 Created by Ant UED</Footer>
        </Layout>
    );
}

export default BasicLayout;