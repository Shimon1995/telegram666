import { EAdress } from "../shared/enums/adress.enum";
import { DialogueState } from "../shared/enums/dialogue_state.enum";
import { EReport } from "../shared/enums/report.enum";

interface SessionRouter {
    current_state: DialogueState;
    report_state: EReport;
    address_state: EAdress;
    img_state: string; // make Image Enum
    end_session: boolean;
}

interface Session {
    session_id: number;
    session_router: SessionRouter;
}

// export interface DB { }
export type DB = any;

export const db = {
    admin: {

    },
    prev_users: [

    ],
    sessions: [
        {
            session_id: 685763684,
            session_router: {
                curent_state: DialogueState.STARTED,
                report_state: '',
                address_state: '',
                img_state: '',
                end: false,
            },
        }
    ],
    reports: [

    ],
};