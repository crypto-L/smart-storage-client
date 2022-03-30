import React from "react";
import { Link } from 'react-router-dom';

function Items() {
    return(
        <div className="Items">
            <Link to={'/storages'}>To storages</Link>
        </div>
    );
}

export {Items};