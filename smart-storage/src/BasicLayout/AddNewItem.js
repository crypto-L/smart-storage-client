import { Form , Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";

class AddNewItem extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        
        return (
            <div>
            <Form>
                <Form.Item name={['user', 'name']} label="Title" rules={[{ required: true }]}>
                <Input />
                </Form.Item>
                <Form.Item name={['user', 'name']} label="Serial number" rules={[{ required: false }]}>
                <Input />
                </Form.Item>
            </Form>
            <br/>
            <Link to={'/storages'} state={{storageId: this.props.storageId}}>To storages</Link>
            </div>
            
        );
    }
}

export default AddNewItem;