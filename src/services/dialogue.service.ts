import { DialogueState } from "../shared/enums/dialogue_state.enum";
import { EReport } from "../shared/enums/report.enum";
import { EPhone } from '../shared/enums/phone.enum';
import { EAdress } from '../shared/enums/adress.enum';
import { IReport } from "../shared/interfaces/report.interface";
import { EMessage } from "../shared/enums/message.enum";
import { MessagesService } from "./messages.service";
import { DatabaseService } from "./db.service";

const { 
    STARTED,
    REPORT,
    ADDRESS,
    ATTACH_IMG,
    ENDING,
 } = DialogueState;

 const {
    BOOKMARK,
    BOOKMARKER,
    SIGN,
    CONSUMING,
    CONSUMED,
    OTHER,
 } = EReport;

 const {
    SPECIFY,
    SHARE,
 } = EAdress;

 const { // there is also SHARE
    BOT,
    LEAVE,
 } = EPhone;

export class DialogueService {

    dialogue_router = { // move to DB
        curent_state: DialogueState.STARTED,
        report_state: '',
        address_state: '',
        img_state: '',
        end: false,
    }

    constructor(
        private message: MessagesService,
        private db: DatabaseService,
    ) { 

    }


    start (message: string) {
        if (this.dialogue_router.curent_state == STARTED) {
            console.log('started');
            this.dialogue_router.curent_state = message as DialogueState;
        } 
        this.switchDialogueState(message);
    }

    async switchDialogueState(message: string) { 

        console.log(message);
        console.log(this.dialogue_router.curent_state);

        switch(this.dialogue_router.curent_state) {
            // case STARTED:
            //     console.log('started');
            //     this.dialogue_router.curent_state = message as DialogueState;
            // break;
            case REPORT:
            this.switchReport(message as EReport);

            if (this.dialogue_router.report_state == '')
            this.message.sendMessage(685763684, `
                    pick the report:\n
                    /bookmark
                    /bookmarker
                    /sign
                    /consumer
                    /consumed
                    /other
                `);
            break;
            case ADDRESS:
                this.message.sendMessage(685763684, 'attach the address');
                break;
                case ATTACH_IMG:
                    this.message.sendMessage(685763684, 'attach image');
            break;
            case ENDING:
                this.message.sendMessage(685763684, 'attach something');
                // QUIT APP
            break;
            default:
                this.message.sendMessage(685763684, `          
                    pick dialogue state:\n
                    /report\n
                    /address\n
                    /image\n
                    /etc\n
                    from default field
                    `
                ); // on new message set report state and switch it here
                this.dialogue_router.curent_state = message as DialogueState;
        }
    }

    private switchReport(report_state: EReport) { 
        // this.message.sendMessage(685763684, `
        //     pick the report:\n
        //     /bookmark
        //     /bookmarker
        //     /sign
        //     /consumer
        //     /consumed
        //     /other
        // `); // on new message set report state and switch it here
        switch(report_state) {
            case BOOKMARK:
                this.dialogue_router.report_state = EReport.BOOKMARK;
                this.message.sendMessage(685763684, 'bookmark');
                // this.dialogue_router.curent_state = DialogueState.ADDRESS;
            break;
            case BOOKMARKER:
                this.dialogue_router.report_state = EReport.BOOKMARKER;
                this.message.sendMessage(685763684, 'bookmarker');
                this.dialogue_router.curent_state = DialogueState.ADDRESS;
            break;
            case SIGN:
            break;
            case CONSUMING:
            break;
            case CONSUMED:
            break;
            case OTHER:
            break;
            // case: '/back':
            // break;
            default:
                console.log('neigther');
                // this.message.sendMessage(685763684, 'wrong input');


            // ATTACH THE ADDRESS
        }
        
    }

    private switchAddress(address_state: EAdress) {
        console.log('address state');
        switch(address_state) {
            case SPECIFY:
            break;
            case SHARE:
            break;
            default:
        }
    }

    private switchPhone(phone_state: EPhone) { 
        switch(phone_state) {
            case EPhone.SHARE:
            break;
            case BOT:
            break;
            case LEAVE:
            break;
            default:
        }
    }
}