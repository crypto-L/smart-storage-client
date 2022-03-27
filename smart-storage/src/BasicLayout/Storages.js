import React from "react";
import Storage from "../DTO/Storage";
import {getAllSubStorages, getStorage} from './api/basic-layout-api';
import {Row, Col, Button} from 'antd';
import { Link } from "react-router-dom";
import AddNewStorage from "./AddNewStorage";


class Storages extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            currentStorageId: this.props.storageId ?? null,
            currentStorageName: null,
            parentStorageId: null,
            parentStorageName: null,
            subStorages: [],
        };
        
        this.handleStorageClick = this.handleStorageClick.bind(this);
        this.handleNewStorageAdd = this.handleNewStorageAdd.bind(this);
    }
    
    async handleNewStorageAdd() {
        //refreshing the page when new storage added
        //callback for AddNewStorage.js
        const currentStorageId = this.state.currentStorageId;
        this.handleStorageClick(currentStorageId);
    }

    handleStorageClick = async (storageId) => {
        //navigate to initial view with root storages
        if(storageId === null){
            const storages = await getAllSubStorages(localStorage.getItem('userId'), localStorage.getItem('token'), null);
            this.setState(
                {
                    currentStorageId: null,
                    currentStorageName: null,
                    parentStorageId: null,
                    parentStorageName: null,
                    subStorages: storages,
                });
        } 
        //navigate to concrete storage view
        else {
            const currentStorage = await getStorage(localStorage.getItem('userId'), localStorage.getItem('token'), storageId);
            const storages = await getAllSubStorages(localStorage.getItem('userId'), localStorage.getItem('token'), storageId);
            this.setState(
            {
                currentStorageId: storageId,
                currentStorageName: currentStorage.storageName,
                parentStorageId: currentStorage.parentId,
                parentStorageName: currentStorage.parentName,
                subStorages: storages,
            });
        }
        
    };

    async componentDidMount(){

        //in case of redirect from newItemPage
        let storageId = null;
        if(this.props.storageId){
            storageId = this.props.storageId;
            this.handleStorageClick(storageId);
        }
        else{
            const storages = await getAllSubStorages(localStorage.getItem('userId'), localStorage.getItem('token'), storageId);
            this.setState({subStorages: storages});
        }
        
    };

    render(){
        const subStorages = this.state.subStorages;
        const storageList = subStorages.map((stor) => 
            <li key={stor.id}>
                <Button  type="link" onClick={() => this.handleStorageClick(stor.id)}>{stor.storageName}</Button>
            </li>);

        //initial view with root storages
        if(this.state.currentStorageId === null){
            return(
                <div className="Storages">
                    <Row>

                    <Col span={12}>
                    <p>Root storages:</p>
                    <AddNewStorage currentStorageId={this.state.currentStorageId} onNewStorageAdd={() => this.handleNewStorageAdd()}/>
                    </Col>

                    <Col span={12}>
                    {storageList}
                    </Col>
                    </Row>
                </div>
            );
        }
        //view with concrete storage
        else {
            const parentId = this.state.parentStorageId;
            return (
            <div className="Storages">
            <Row>
            
            <Col span={12}>
            <p>Storage {this.state.currentStorageName}:</p>
            <AddNewStorage currentStorageId={this.state.currentStorageId} onNewStorageAdd={() => this.handleNewStorageAdd()}/>
            <Link to={'/addNewItem'} state={{storageId: this.state.currentStorageId}}>Add new item</Link>
            <Button type="link" onClick={() => this.handleStorageClick(parentId)}>
                Back
            </Button>
            
            </Col>

            <Col span={12}>
            {storageList}
            </Col>
            </Row>
            </div>
        );
        }
    }
}

export default Storages;