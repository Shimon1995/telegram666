import { IReport } from "./report.interface";

export interface ISession {
    chat_id: number;
    user_id: string;
    username: string;
    report: IReport;
}