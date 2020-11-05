import { Session } from './session/Session';
import { DialogueService } from "./services/dialogue.service";
import { MessagesService } from "./services/messages.service";
import { Result } from './shared/interfaces/result.interface';
import { DatabaseService } from './services/db.service';

export class AppComponent {
    
    sessions: Array<Session> = new Array(); // move to db

    constructor(
        private readonly dialogue: DialogueService,
        private readonly messages: MessagesService,
    ) { }

    async Init() {
        this.messages.setLatestMessage(await this.messages.getLatestMessage());
        
        setInterval (
            async () => { 
                await this.loop()
            },
            100,
        );         
    }

    async chatChange() : Promise<boolean> { 
        return this.messages.gotNewMessage();
    }

    private checkSessionForExistance(newMessage: Result): boolean {
        for (let session of this.sessions) {
            if (session.chat_id == newMessage.message.from.id &&
                session.user_id == newMessage.message.from.username
            ) { 
                return true;
            }
        }
        return false;
    }

    private initSession (session: Session) {
        this.sessions.push(session);
    }

    async loop() {
        const chat_change = await this.chatChange();
        if (chat_change) {
            const latestMessage = await this.messages.getLatestMessage();
            const session_exists = this.checkSessionForExistance(latestMessage);

            if (!session_exists) { // SET INCOMMING MESSAGE AS 'CURRENT STATE'

                const from = latestMessage.message.from;
                const report = {
                    chat_id: from.id,
                    text: latestMessage.message.text
                };
                const new_session = new Session ( // move to session init
                    new MessagesService(),
                    from.id,
                    from.username,
                    from.first_name,
                    report, // report is gonna be generated inside the class
                );
                this.initSession(new_session);
                this.messages.sendMessage(685763684, `          
                    pick dialogue state:\n
                    /report\n
                    /address\n
                    /image\n
                    /etc\n`
                );
            } else { // передай значение current_state 
                this.messages.sendMessage(685763684, 'session exists');
                console.log(latestMessage.message.text);
                
                await this.sessions[0].start(latestMessage.message.text); // DON'T FORGET TO FIX!!! find session
            }
        }
        this.messages.setLatestMessage(await this.messages.getLatestMessage());
    }

}