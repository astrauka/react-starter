import { Flummox } from 'flummox';

class Flux extends Flummox {
    constructor() {
        super();

        // Create actions first so our store can reference them in its constructor
        this.createActions('messages', MessageActions);

        // The extra argument (reference to this FLux instance) gets passed to the MessageStore constructor.
        this.createStore('messages', MessageStore, this);
    }

}