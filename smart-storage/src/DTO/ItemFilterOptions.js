class ItemQueryParameters {
    constructor(title = null, serialNumber = null, category = null,
        minWeight = null, maxWeight = null, minAmount = null, maxAmount = null) {
        this.title = title;
        this.serialNumber = serialNumber;
        this.category = category;
        this.minWeight = minWeight;
        this.maxWeight = maxWeight;
        this.minAmount = minAmount;
        this.maxAmount = maxAmount;

    }


    makeQueryString() {
        let queryString = '?';
        let parameters = [];
        for (const parameter in this) {
            if (this[parameter] !== null) {
                const parameterString = `${parameter}=${this[parameter]}`
                parameters.push(parameterString);
            }
        }
        queryString =  queryString + parameters.join('&');
        return queryString !== '?' ? queryString : null;
    }
}


export default ItemQueryParameters;