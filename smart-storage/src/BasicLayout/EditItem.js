import React from "react";
import { Alert } from "antd";
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
                    <form onChange={(e) => this.onImageFormChange(e)}>
                        <input 
                            type="file"
                            name="image"
                            id="file"
                            accept=".jpeg, .png, .jpg"
                        />
                    </form>
                    <img src={`data:image/jpeg;base64,${this.state.itemImage}`}/>
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