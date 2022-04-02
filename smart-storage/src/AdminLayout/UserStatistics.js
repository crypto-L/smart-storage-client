import React from "react";
import { Statistic, Row, Col, PageHeader } from 'antd';
import { getStorageWithMaxItems, getUser, getUserItemsCount, getUserRootStoragesCount, getUserStoragesCount } from "./api/admin-layout-api";
import { Link } from "react-router-dom";

class UserStatistics extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: this.props.userId,
            nickname: null,
            itemsCount: null,
            storagesCount: null,
            rootStoragesCount: null,
            maxItemsStorage: null,
        }

    }

    async componentDidMount(){
        const userId = this.state.userId;
        const user = await getUser(localStorage.getItem('userId'), localStorage.getItem('token'), userId);
        const itemsCount = await getUserItemsCount(localStorage.getItem('userId'), localStorage.getItem('token'), userId);
        const storagesCount = await getUserStoragesCount(localStorage.getItem('userId'), localStorage.getItem('token'), userId);
        const rootStoragesCount = await getUserRootStoragesCount(localStorage.getItem('userId'), localStorage.getItem('token'), userId);
        const maxItemsStorage = await getStorageWithMaxItems(localStorage.getItem('userId'), localStorage.getItem('token'), userId);
        
        this.setState({
            nickname: user.nickname,
            itemsCount: itemsCount,
            storagesCount: storagesCount,
            rootStoragesCount: rootStoragesCount,
            maxItemsStorage: maxItemsStorage,
        })
    }

    render() {
        const id = this.state.userId;
        const nickname = this.state.nickname;
        const itemsCount = this.state.itemsCount;
        const rootStoragesCount = this.state.rootStoragesCount;
        const totalStoragesCount = this.state.storagesCount;
        const maxItemsStorage = this.state.maxItemsStorage;
        
        let maxItemStatistics = (<Statistic title="Storage with the maximum number of items" value="-"/>);
        if(maxItemsStorage !== null 
            && maxItemsStorage.storageItems != null
            && maxItemsStorage.storageItems.length > 0){
            maxItemStatistics = (<Statistic title="Storage with the maximum number of items" value={maxItemsStorage.storageName} suffix={`(${maxItemsStorage.storageItems.length} items)`}/>)
        }

        return (
            <div className="UserStatistics">
                <PageHeader title={nickname} subTitle={`ID: ${id}`}/>
                <Row gutter={16}>
                    <Col span={12}>
                        <Statistic title="Total items" value={itemsCount} prefix={null} />
                    </Col>
                    <Col span={12}>
                        <Statistic title="Root storages / Total storages" value={rootStoragesCount} suffix={`/ ${totalStoragesCount}`} />
                    </Col>
                    <Col span={12}>
                        {maxItemStatistics}
                    </Col>
                    <Col span={12}>
                        <Link to="/users">Back to Users</Link>
                    </Col>
                </Row>
                
            </div>
        );
    }
}

export default UserStatistics;