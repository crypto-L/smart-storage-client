import React from "react";
import 'antd/dist/antd.css';
import { Layout, Menu} from 'antd';
import { Link, Route, Routes } from "react-router-dom";
import Storages from "./Storages";
import { Items } from "./Items";
import './index.css';
import { useLocation } from "react-router-dom";
import AddNewItem from "./AddNewItem";
import EditItem from "./EditItem";

const { Header, Content, Footer } = Layout;

const BasicLayout = () => {
    const {state} = useLocation();
    let storageRoute = null;
    let addNewItemRoute = null;
    let editItemRoute = null;
    let itemsRoute = null;
    
    if(state === null){
        storageRoute = (<Route path="/storages" element={<Storages/>}/>);
        itemsRoute = <Route path="/items" element={<Items />}/>
    }
    else {
        
        const storageId = state.storageId;
        addNewItemRoute = <Route path="/addNewItem" element={<AddNewItem storageId={storageId}/>}/>

        const itemId = state.itemId;
        const fromItems = state.fromItems;
        const filterObject = state.filterObject;
        editItemRoute = <Route path="/editItem" element={<EditItem storageId={storageId} itemId={itemId} fromItems={fromItems} filterObject={filterObject}/>}/>

        storageRoute = <Route path="/storages" element={<Storages storageId={storageId}/>}/>

        itemsRoute = <Route path="/items" element={<Items filterObject={filterObject}/>}/>
    }

    function logOut(){
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        window.location = '/'
        window.location.reload(false);
    }

    return (
        <Layout className="Layout">
            <Header>
                <div className="logo" />
                 <Menu theme="dark" mode="horizontal" defaultSelectedKeys={'0'}>
                    <Menu.Item key={1}>Storages<Link to="/storages" /></Menu.Item>
                    <Menu.Item key={2}>Items<Link to="/items" /></Menu.Item>
                    <Menu.Item key={3} style={{marginLeft: 'auto'}} onClick={logOut}><Link to="/">Log out</Link></Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                <Routes>
                    {storageRoute}
                    {itemsRoute}
                    {addNewItemRoute}
                    {editItemRoute}
                </Routes>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Smart Storage ?? 2022 Created by Ant UED</Footer>
        </Layout>
    );
}

export default BasicLayout;