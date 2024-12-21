export class SessionService {

    constructor() {
        this.username = "";
        // Save the instance for reuse
        SessionService.instance = this;
    }

    static getInstance() {
        // If an instance already exists, return it
        if (SessionService.instance)
            return SessionService.instance;
        else
            return new SessionService();
    }

    getSessionUserID() {
        return this.username;
    }

    setSessionUserID(name) {
        this.username = name;
    }

};