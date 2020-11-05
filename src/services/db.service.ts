import { DB } from "../temp/pseudoDB";

export class DatabaseService {

    constructor (private db: DB) { }

    getSessionById (session_id: number) {
        for (let session of this.db.sessions) {
            if (session.session_id == session_id) {
                return session;
            }
        }
        throw new Error('session not found');
    }

    getPrevUser() { }

    getReports() { }

    getStates() { }
}