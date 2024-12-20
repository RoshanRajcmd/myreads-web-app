export class SessionService {

    constructor() {
        this.username = "";
    }

    getSessionUserName() {
        return this.username;
    }

    setSessionUserName(name) {
        this.username = name;
    }

};