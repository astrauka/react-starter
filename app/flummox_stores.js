import { Store } from 'flummox';

export default class UserStore extends Store {

    constructor(flux) {
        super(); // Don't forget this step

        const userActionIds = flux.getActionIds('users');
        this.register(userActionIds.createUser, this.handleNewUser);

        this.state = {
            users: []
        };
    }

    handleNewUser(user) {
        this.setState({
            users: this.state.users.concat([user])
        });
    }

}