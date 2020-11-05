import axios from 'axios';
import _ from 'lodash';
import { DialogueState } from '../shared/enums/dialogue_state.enum';

import { EMessage } from '../shared/enums/message.enum';
import { Result } from '../shared/interfaces/result.interface';
import { DialogueService } from './dialogue.service';


const {
    START,
} = EMessage;


export class MessagesService {

    private readonly token = process.env.npm_package_env_API_TOKEN;
    private readonly URL = `https://api.telegram.org/bot${this.token}/`;
    private latest_message: Result;

    constructor(
    ) { }

    async sendMessage(chat_id: number = 685763684, text: string) {
        // try {
            axios.get(this.URL + 'sendMessage', {
                params: {
                    chat_id,
                    text,
                    parse_mode: 'HTML',
                    // offset: 200,
                },
                headers: {
                    status: 200
                }
            });
        //     if (await this.gotNewMessage()) {
        //         return (await this.getLatestMessage()).message.text;
        //     }
        //     return 'DIALOGUE FINISHED'; // FINISH THE DIALOGUE
        // } catch (error) {
        //     console.error('send message error')
        //     console.error(error)
        // }
    }

    setLatestMessage(new_latest_message: Result) {
        this.latest_message = new_latest_message;
    }

    // Uncomplete 
    // compares new and previous messages
    async gotNewMessage (): Promise<boolean> {
        const new_message = await this.getLatestMessage();
        if (
            this.latest_message.update_id == new_message.update_id &&
            this.latest_message.message.text == new_message.message.text
        ) {
            return false;
        }
        return true;
    }

    async getLatestMessage(): Promise<Result> {
        try {
            const results = await this.getResults();
            return _.last(results);
        } catch (error) {
            console.error('getting latest message error');            
        }
    }

    private async getResults(): Promise<Result[]> {
        const { data } = await axios.get(this.URL + 'getUpdates', {
            headers: {
                status: 200
            }
        });
        return data.result;
    }


    // DON'T FORGET TO FINISH
    // switchMessage(message: string) {
    //     // this.dialogue.switchDialogueState(message as DialogueState);
    //    this.dialogue.switchDialogueState(message as DialogueState);
    // }
}