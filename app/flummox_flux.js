import { Flummox } from 'flummox';
import UserActions from './flummox_actions.js';
import UserStore from './flummox_stores.js';

export default class Flux extends Flummox {
    constructor() {
        super();

        // Create actions first so our store can reference them in its constructor
        this.createActions('users', UserActions);

        // The extra argument (reference to this Flux instance) gets passed to the UserStore constructor.
        this.createStore('users', UserStore, this);

        // Debug
        this.on('dispatch', function (payload) {
            console.log('dispatching -> ',  payload);
        });
        this.on('error', function (err) {
            console.error(err.stack);
        });
    }

}