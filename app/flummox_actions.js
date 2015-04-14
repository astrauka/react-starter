import { Actions } from 'flummox';

class MessageActions extends Actions {

    createMessage(messageContent) {
        return {
            content: messageContent,
            date: Date.now()
        };
    }

}