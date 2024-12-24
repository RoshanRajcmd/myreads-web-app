export class SessionService {

    constructor() {
        this.user = {
            userId: "",
            fullName: "",
            userName: "",
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

    setSessionUserDetials(sessionUser) {
        if (sessionUser !== undefined) {
            this.user.userId = sessionUser.id;
            this.user.fullName = sessionUser.fullName;
            this.user.userName = sessionUser.userName;
            this.user.dob = sessionUser.dob;
            this.user.email = sessionUser.email;
        }
        else {
            this.user.userId = "";
            this.user.fullName = "";
            this.user.userName = "";
            this.user.dob = "";
            this.user.email = "";
        }
    }

    getSessionUser() {
        return this.user;
    }

    getSessionUserID() {
        return this.user.userId;
    }

    getSessionUsername() {
        return this.user.username;
    }

    getSessionUserDob() {
        return this.user.dob;
    }

    getSessionUserEmail() {
        return this.user.email;
    }
};