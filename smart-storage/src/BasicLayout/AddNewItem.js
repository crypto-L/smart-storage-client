import { Form, Input, Button, InputNumber, Alert } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Item from "../DTO/Item";
import { addNewItem , getItem} from "./api/basic-layout-api";

class AddNewItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            success: null,
            itemId: this.props.itemId ?? null,
            itemTitle: null,
        }

    }

    handleOnClick = async (values) => {
        const storageId = this.props.storageId;
        const title = values.title;
        const serialNumber = values.serialNumber ? values.serialNumber : null;
        const category = values.category ? values.category : null;
        const weight = values.weight ? values.weight : null;
        const amount = values.amount ? values.amount : null;
        const item = new Item(storageId, title, null, serialNumber, null, category, weight, amount);

        const response = await addNewItem(localStorage.getItem('userId'), localStorage.getItem('token'), item);
        if (response !== null) {
            this.setState({ success: true });
        }
    }

    async componentDidMount(){
        if(this.state.itemId !== null){
            const itemId = this.state.itemId;
            const item = await getItem(localStorage.getItem('userId'), localStorage.getItem('token'), itemId);
            this.setState({itemTitle: item.title});
            
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
            
            console.log(this.state.itemTitle)
            return (
                <div>
                    <Form name="itemForm" onFinish={(values) => this.handleOnClick(values)}>
                        <Form.Item initialValue={this.state.itemTitle} name="title" label="Title" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item initialValue={''} name="serialNumber" label="Serial number">
                            <Input />
                        </Form.Item>
                        <Form.Item initialValue={''} name='category' label="Category" >
                            <Input />
                        </Form.Item>
                        <Form.Item initialValue={''} name='weight' label="Weight in grams">
                            <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item initialValue={''} name='amount' label="Amount">
                            <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                {buttonText}
                            </Button>
                        </Form.Item>
                    </Form>
                    <Link to={'/storages'} state={{ storageId: this.props.storageId }}>To storages</Link>
                    <br />
                </div>
            );
        }
    }
}

export default AddNewItem;