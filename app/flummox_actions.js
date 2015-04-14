import { Actions } from 'flummox';

class MessageActions extends Actions {

    async createMessage(messageContent) {
        try {
            return await serverCreateMessage(messageContent);
        } catch (error) {
            // handle error somehow
        }
    }

}