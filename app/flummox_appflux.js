import { Flux } from 'flummox';

class AppFlux extends Flux {

    constructor() {
        super();

        this.createActions('messages', MessageActions);

        // The extra argument(s) are passed to the MessageStore constructor
        this.createStore('messages', MessageStore, this);
    }

}