import React from "react";
import { Link } from 'react-router-dom';
import {getAllItems, getAllItemsWithFilter} from "./api/basic-layout-api";
import { Row, Table, Col } from 'antd';
import Column from "antd/lib/table/Column";
import ItemQueryParameters from "../DTO/ItemFilterOptions";

class Items extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            items: [],
            titleFilter: "",
            serialNumberFilter: "",
            categoryFilter: "",
            minWeightFilter: "",
            maxWeightFilter: "",
            minAmountFilter: "",
            maxAmountFilter: "",
            filterObject: this.props.filterObject,

        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSearchButton = this.handleSearchButton.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    async handleSearchButton(){
        //TODO: implement
        // take filter parameters from inputs, create queryString, create request
        const titleParameter = this.state.titleFilter === "" ? null : this.state.titleFilter;
        const serialNumberParameter = this.state.serialNumberFilter === "" ? null : this.state.serialNumberFilter;
        const categoryParameter = this.state.categoryFilter === "" ? null : this.state.categoryFilter;
        const minWeightParameter = this.state.minWeightFilter === "" ? null : this.state.minWeightFilter;
        const maxWeightParmeter = this.state.maxWeightFilter === "" ? null : this.state.maxWeightFilter;
        const minAmountParameter = this.state.minAmountFilter === "" ? null : this.state.minAmountFilter;
        const maxAmountParameter = this.state.maxAmountFilter === "" ? null : this.state.maxAmountFilter;

        let queryParameters = new ItemQueryParameters(titleParameter, serialNumberParameter,  categoryParameter, minWeightParameter, 
            maxWeightParmeter, minAmountParameter, maxAmountParameter);
        let queryString = queryParameters.makeQueryString();

        const items = await getAllItemsWithFilter(localStorage.getItem('userId'), localStorage.getItem('token'),queryString) ?? [];
        this.setState({
            items: items,
            filterObject: queryParameters,
        })

    }

    async componentDidMount(){
        let items = []

        //if returned from 'EditItem' page after filter applyed
        if(this.state.filterObject){
            const filterObject = this.state.filterObject;
            const titleFilter = filterObject.title;
            const serialNumberFilter = filterObject.serialNumber;
            const categoryFilter = filterObject.category;
            const minWeightFilter = filterObject.minWeight;
            const maxWeightFilter = filterObject.maxWeight;
            const minAmountFilter = filterObject.minAmount;
            const maxAmountFilter = filterObject.maxAmount;
            const queryParameters = new ItemQueryParameters(titleFilter, serialNumberFilter, categoryFilter, minWeightFilter, maxWeightFilter,
                minAmountFilter, maxAmountFilter);
            
            const queryString = queryParameters.makeQueryString();
            this.setState({
                titleFilter: titleFilter ?? "",
                serialNumberFilter: serialNumberFilter ?? "",
                categoryFilter: categoryFilter ?? "",
                minWeightFilter: minWeightFilter ?? "",
                maxWeightFilter: maxWeightFilter ?? "",
                minAmountFilter: minAmountFilter ?? "",
                maxAmountFilter: maxAmountFilter ?? "",
            })
            items = await getAllItemsWithFilter(localStorage.getItem('userId'), localStorage.getItem('token'),queryString) ?? []; 
        } else {
            items = await getAllItems(localStorage.getItem('userId'), localStorage.getItem('token')) ?? [];
        }
        
        this.setState({
            items: items,
        }); 
    }

    render(){
        const data = this.state.items;
        return(
            <div className="Items">
                
                <Row>
                    <input name="titleFilter" placeholder="Title" onChange={this.handleInputChange} value={this.state.titleFilter} />
                    <input name="serialNumberFilter" placeholder="Serial number" onChange={this.handleInputChange} value={this.state.serialNumberFilter}/>
                    <input name="categoryFilter" placeholder="Category" onChange={this.handleInputChange} value={this.state.categoryFilter} />
                    <button onClick={this.handleSearchButton}>Search</button>
                    <Col span={12}>
                    <input name="minWeightFilter" min='0' type="number" placeholder="Minimal weight" onChange={this.handleInputChange} value={this.state.minWeightFilter}/>
                    <input name="maxWeightFilter" min='0' type="number" placeholder="Maximal weight" onChange={this.handleInputChange} value={this.state.maxWeightFilter}/>
                    </Col>
                    <Col span={12}>
                    <input name="minAmountFilter" min='0' type="number" placeholder="Minimal amount" onChange={this.handleInputChange} value={this.state.minAmountFilter}/>
                    <input name="maxAmountFilter" min='0' type="number" placeholder="Maximal amount" onChange={this.handleInputChange} value={this.state.maxAmountFilter}/>
                    </Col>
                </Row>

                <Table dataSource={data} rowKey='id'>
                <Column title="Title" dataIndex="title"/>
                <Column title="Serial Number" dataIndex="serialNumber"/>
                <Column title="Category" dataIndex="category"/>
                <Column title="Weight" dataIndex="weightInGrams"/>
                <Column title="Amount" dataIndex="amount"/>
                <Column title="Edit" key="edit" render={(item) =>(
                    <Link to={'/editItem'} state={{itemId: item.id, fromItems: true, filterObject: this.state.filterObject}}>Edit</Link>
                )}/>
                </Table>
                <Link to={'/storages'}>To storages</Link>
            </div>
        );
    }
    
}

export {Items};