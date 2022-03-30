import React from "react";
import { Link } from 'react-router-dom';
import {getAllItems, getTest} from "./api/basic-layout-api";
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

        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
        console.log(this.state[name])
    }

    handleSearchButton(){
        //TODO: implement
        // take filter parameters from inputs, create queryString, create request
    }

    async componentDidMount(){
        const items = await getAllItems(localStorage.getItem('userId'), localStorage.getItem('token')) ?? [];
        this.setState({
            items: items,
        });

        let queryParameters = new ItemQueryParameters();
        let query = queryParameters.makeQueryString();
        console.log(query);
        var testItems = getTest(localStorage.getItem('userId'), localStorage.getItem('token'));
        
    }

    render(){
        const data = this.state.items;
        return(
            <div className="Items">
                
                <Row>
                    <input name="titleFilter" placeholder="Title" onChange={this.handleInputChange} value={this.state.titleFilter} />
                    <input name="serialNumberFilter" placeholder="Serial number" onChange={this.handleInputChange} value={this.state.serialNumberFilter}/>
                    <input name="categoryFilter" placeholder="Category" onChange={this.handleInputChange} value={this.state.categoryFilter} />
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
                    <Link to={'/editItem'} state={{itemId: item.id, fromItems: true}}>Edit</Link>
                )}/>
                </Table>
                <Link to={'/storages'}>To storages</Link>
            </div>
        );
    }
    
}

export {Items};