import React from "react";
import { Link } from 'react-router-dom';

function Items() {
    return(
        <div className="Items">
            <Link to={'/storages'} state={{storageId: 'test'}}>To storages</Link>
        </div>
    );
}

export {Items};