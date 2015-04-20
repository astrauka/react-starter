import { Actions } from 'flummox';

export default class UserActions extends Actions {

    async createUser(userUsername, userFullname, userEmail) {
        try {
            //return await serverCreateUser();   // Could communicate with server here.
            return {
                username: userUsername,
                fullname: userFullname,
                email: userEmail
            };
        } catch (error) {
            // handle error somehow
        }
    }

}