import { Actions } from 'flummox';

export default class MessageActions extends Actions {

    async createMessage(messageContent) {
        try {
            return await serverCreateMessage(messageContent);
        } catch (error) {
            // handle error somehow
        }
    }

}