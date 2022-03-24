class User {
    constructor(nickname, passwordHash, id = null, rootStoragesIdNameDictionary = null){
        this.id = id;
        this.nickname = nickname;
        this.passwordHash = passwordHash;
        this.rootStorages = null;
    };
};

export default User;