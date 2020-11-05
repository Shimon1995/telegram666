import { DatabaseService } from "../services/db.service";
import { DialogueService } from "../services/dialogue.service";
import { MessagesService } from "../services/messages.service";
import { IReport } from "../shared/interfaces/report.interface";
import { ISession } from "../shared/interfaces/session.interface";
import { db } from "../temp/pseudoDB";

export class Session implements ISession {
    
    dialogue: DialogueService = new DialogueService(
        this.message, 
        new DatabaseService(db),
    );

    constructor (
        private message: MessagesService,
        public chat_id: number,
        public user_id: string,
        public username: string,
        public report: IReport
    ) { }

    public static findSessionById (session_id: number, sessionLIst: Array<Session>): Session { 
        for (let session of sessionLIst) {
            if (session.chat_id == session_id) {
                return session;
            }
        }
        throw new Error('Session not found');
    }

    public static findSessionByUserId (user_id: string, sessionList: Array<Session>) { 
        for (let session of sessionList) {
            if (session.user_id == user_id) {
                return session;
            }
        }
        throw new Error('Session not found');
    }

    async start (message: string) { 
        await this.dialogue.start(message);
    }

    end () { 

    }

    private async initiAsk () {
        const lm = await this.message.getLatestMessage();
        if (this.message.gotNewMessage()) {
            return lm.message.text;
        }
        throw new Error('initial ask error');
    }
}