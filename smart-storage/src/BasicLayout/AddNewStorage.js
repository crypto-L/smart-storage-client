import React, { useState } from "react";
import {Input, Button} from "antd";
import {addNewSubStorage} from './api/basic-layout-api';

function AddNewStorage(props) {
    const currentStorageId = props.currentStorageId;
    const [newStorageName, setNewStorageName] = useState('');
    
    function handleOnSubmit(newStorageName){
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        addNewSubStorage(userId, token, newStorageName, currentStorageId);
        setNewStorageName('');
        props.onNewStorageAdd();
    }
    return (
    <Input.Group compact>
        <Input value={newStorageName} onChange={e => setNewStorageName(e.target.value)} style={{ width: 150 }} placeholder="New storage name" />
        <Button onClick={() => handleOnSubmit(newStorageName)} style={{width: 50}} type="primary">Add</Button>
    </Input.Group>
    );
}


export default AddNewStorage;