export class SessionService {

    constructor() {
        this.user = {
            userId: "",
            username: "",
            dob: "",
            email: ""
        }
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
        return this.user.userId;
    }

    setSessionUserID(userId) {
        this.user.userId = userId;
    }

    setSessionUserDetials(sessionUser) {
        if (sessionUser !== undefined) {
            this.user.userId = sessionUser.id;
            this.user.username = sessionUser.name;
            this.user.dob = sessionUser.dob;
            this.user.email = sessionUser.email;
        }
        else {
            this.user.userId = "";
            this.user.username = "";
            this.user.dob = "";
            this.user.email = "";
        }
    }

};