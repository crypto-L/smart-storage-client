import React from "react";
import {getAllSubStorages} from './api/basic-layout-api';

class Storages extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            currentStorageId: null,
        }

        localStorage.getItem('userId');
        localStorage.getItem('token');
        
        //TODO: send null or parent storage id also,mb remove method from constructor
        getAllSubStorages(localStorage.getItem('userId'), localStorage.getItem('token'), null);
    }



    render(){
        return(
        <div className="Storages">
            <p>I'm Storages component.</p>
        </div>
        );
    }
}

export default Storages;