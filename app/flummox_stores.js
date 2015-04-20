import { Store } from 'flummox';

export default class UserStore extends Store {

    constructor(flux) {
        super(); // Don't forget this step

        const userActionIds = flux.getActionIds('users');
        this.register(userActionIds.createUser, this.handleNewUser);

        this.state = {
            //users: []

            // Interim dummy data:
            users: [{
                username: "testkees",
                fullname: "Test Kees",
                email: "testkees@schaapzegt.be"
            }, {
                username: "anban1984",
                fullname: "Anna Banana",
                email: "annabanana3@minio.nz"
            }, {
                username: "xavlee",
                fullname: "Xavier Lee",
                email: "xavierlee@example.com"
            }]
        };
    }

    handleNewUser(user) {
        this.setState({
            users: this.state.users.concat([user])
        });
    }

}