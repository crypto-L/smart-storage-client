import { Form, Input, Button, InputNumber, Alert } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Item from "../DTO/Item";
import { addNewItem } from "./api/basic-layout-api";

class AddNewItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            success: null,
            itemImage: null
        }

    }

    onImageFormChange = (e) => {
        let file = e.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.onload =  this.handleReaderLoaded.bind(this);
            reader.readAsBinaryString(file);
        }
    }

    handleReaderLoaded = (readerEvt) => {
        let binaryString = readerEvt.target.result;
        this.setState({
            itemImage: btoa(binaryString),
        })
    }

    handleOnClick = async (values) => {
        const storageId = this.props.storageId;
        const title = values.title;
        const serialNumber = values.serialNumber ? values.serialNumber : null;
        const category = values.category ? values.category : null;
        const weight = values.weight ? values.weight : null;
        const amount = values.amount ? values.amount : null;
        const image = this.state.itemImage;
        const item = new Item(storageId, title, null, serialNumber, image, category, weight, amount);

        const response = await addNewItem(localStorage.getItem('userId'), localStorage.getItem('token'), item);
        if (response !== null) {
            this.setState({ success: true });
        }
    }

    render() {
        let buttonText = "Add item";
        
        if (this.state.success === true) {
            return (
                <div>
                    <Alert
                        message="Success!"
                        description="Press 'To storages' link."
                        type="success"
                        showIcon
                    />
                    <Link to={'/storages'} state={{ storageId: this.props.storageId }}>To storages</Link>
                </div>
            );
        } else {
            
            return (
                <div>
                    <Form name="itemForm" onFinish={(values) => this.handleOnClick(values)}>
                        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="serialNumber" label="Serial number">
                            <Input />
                        </Form.Item>
                        <Form.Item name='category' label="Category" >
                            <Input />
                        </Form.Item>
                        <Form.Item name='weight' label="Weight in grams">
                            <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item name='amount' label="Amount">
                            <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                {buttonText}
                            </Button>
                        </Form.Item>
                    </Form>
                    <form onChange={(e) => this.onImageFormChange(e)}>
                        <input 
                            type="file"
                            name="image"
                            id="file"
                            accept=".jpeg, .png, .jpg"
                        />
                    </form>
                    <img src={`data:image/jpeg;base64,${this.state.itemImage}`}/>
                    <Link to={'/storages'} state={{ storageId: this.props.storageId }}>To storages</Link>
                    <br />
                </div>
            );
        }
    }
}

export default AddNewItem;