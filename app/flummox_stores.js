import { Store } from 'flummox';

class MessageStore extends Store {

    constructor(flux) {
        super(); // Don't forget this step

        const messageActionIds = flux.getActionIds('messages');
        this.register(messageActionIds.createMessage, this.handleNewMessage);

        this.state = {
            messages: [],
        };
    }

    handleNewMessage(message) {
        this.setState({
            messages: this.state.messages.concat([message]),
        });
    }

}