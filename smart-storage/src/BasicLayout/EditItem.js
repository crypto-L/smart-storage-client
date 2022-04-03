import React from "react";
import { Alert, Image, Row, Col} from "antd";
import { Link } from "react-router-dom";
import Item from "../DTO/Item";
import { getItem, editItem, deleteItem } from "./api/basic-layout-api";

class EditItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            success: null,
            fromItems: this.props.fromItems,
            storageId: this.props.storageId,
            itemId: this.props.itemId,
            itemTitle: "",
            itemSerialNumber: "",
            itemImage: null,
            itemCategory: "",
            itemWeight: 0,
            itemAmount: 0,
            filterObject: this.props.filterObject,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
        

    }

    async componentDidMount() {
        const itemId = this.state.itemId;
        const item = await getItem(localStorage.getItem('userId'), localStorage.getItem('token'), itemId);
    
        if (item !== null) {
            this.setState({
                storageId: item.storageId,
                itemTitle: item.title ?? "",
                itemSerialNumber: item.serialNumber ?? "",
                itemImage: item.image,
                itemCategory: item.category ?? "",
                itemWeight: item.weightInGrams ?? 0,
                itemAmount: item.amount ?? 0,
            })
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
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

    async handleDeleteSubmit() {
        const itemId = this.state.itemId;
        const storageId = this.state.storageId;
        const title = this.state.itemTitle;
        const itemDto = new Item(storageId, title, itemId);
        const res = await deleteItem(localStorage.getItem('userId'), localStorage.getItem('token'), itemDto);
        if(res !== null){
            this.setState({success: true});
        }

    }

    async handleFormSubmit(event) {
        event.preventDefault();
        const itemId = this.state.itemId;
        const storageId = this.state.storageId;
        const title = this.state.itemTitle;
        const serialNumber = this.state.itemSerialNumber === "" ? null : this.state.itemSerialNumber;
        const image = this.state.itemImage;
        const category = this.state.itemCategory === "" ? null : this.state.itemCategory;
        const weight = this.state.itemWeight === "" ? null : this.state.itemWeight;
        const amount = this.state.itemAmount === "" ? null : this.state.itemAmount;
        const itemDto = new Item(storageId, title, itemId, serialNumber, image, category, weight, amount);

        const editedItem = await editItem(localStorage.getItem('userId'), localStorage.getItem('token'), itemDto);
        if(editedItem !== null){
            this.setState({success: true})
        }
        
    }

    render() {
        let backLink = (<Link to={'/storages'} state={{ storageId: this.state.storageId }}>To storages</Link>);
        if(this.state.fromItems){

            backLink = (<Link to={'/items'} state={{filterObject:this.state.filterObject}}>To items</Link>)
        }
        if (this.state.success !== true) {

            return (
                <div className="EditItem">
                    <Row>
                    <Col span={12}>
                        
                    
                    <form onSubmit={this.handleFormSubmit}>
                        <label>Title:
                            <input name="itemTitle" pattern=".{1,}" required title="1 character minimum" onChange={this.handleInputChange} value={this.state.itemTitle} type="text" />
                        </label>

                        <br />
                        <label>Serial number:
                            <input name="itemSerialNumber" onChange={this.handleInputChange} value={this.state.itemSerialNumber} type="text" />
                        </label>

                        <br />
                        <label>Category:
                            <input name="itemCategory" onChange={this.handleInputChange} value={this.state.itemCategory} type="text" />
                        </label>

                        <br />
                        <label>Weight in grams:
                            <input name="itemWeight" min='0' onChange={this.handleInputChange} value={this.state.itemWeight} type="number" />
                        </label>

                        <br />
                        <label>
                            <input name="itemAmount" min='0' onChange={this.handleInputChange} value={this.state.itemAmount} type="number" />
                        </label>Amount:

                        <br />
                        <input value="Save changes" type='submit' />
                    </form>
                    <button onClick={this.handleDeleteSubmit}>Delete item</button>
                    <br/>
                    {backLink}
                    </Col>
                    <Col span={12}>
                    
                    <form onChange={(e) => this.onImageFormChange(e)}>
                        <input 
                            type="file"
                            name="image"
                            id="file"
                            accept=".jpeg, .png, .jpg"
                        />
                    </form>
                    <Image 
                        width={400} 
                        height={400} 
                        src={`data:image/jpeg;base64,${this.state.itemImage}`}
                        fallback="data:image/png;base64,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"
                    />
                    
                    </Col>
                    </Row>
                </div>
            );
        }
        else {
            return (
                <div>
                    <Alert
                        message="Success!"
                        description="Press 'To storages' link."
                        type="success"
                        showIcon
                    />
                    {backLink}
                </div>
            );
        }

    }
}

export default EditItem;