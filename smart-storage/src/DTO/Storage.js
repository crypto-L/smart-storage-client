class Storage {
    constructor(storageName, userId, id = null, parentId = null
        , parentName = null, storageItems = null,
        subStoragesIdNameDictionary = null){
            this.storageName = storageName;
            this.userId = userId;
            this.id = id;
            this.parentId = parentId;
            this.parentName = parentName;
            this.storageItems = storageItems;
            this.subStoragesIdNameDictionary = subStoragesIdNameDictionary;
        };
};

export default Storage;