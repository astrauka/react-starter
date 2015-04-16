import { Actions } from 'flummox';

export default class MessageActions extends Actions {

    async createMessage(messageContent) {
        try {
            //return await serverCreateMessage(messageContent);
            return {
                content: messageContent,
                date: Date.now(),
            };
        } catch (error) {
            // handle error somehow
        }
    }

}