class Item {
    constructor(storageId, title ,id = null, serialNumber = null,
    image = null, category = null, weightInGrams = null, amount = null, userId = null){
        this.storageId = storageId;
        this.title = title;
        this.id = id;
        this.serialNumber = serialNumber;
        this.image = image;
        this.category = category;
        this.weightInGrams = weightInGrams;
        this.amount = amount;
        this.userId = userId;
    }
}

export default Item;