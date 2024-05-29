import {text} from "drizzle-orm/sqlite-core";

export interface DatabaseUser {
    id?: number;
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    department: string;
    winner: string;
    secretWinner: string;
}
