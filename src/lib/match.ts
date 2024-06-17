import db from "../core/db.ts";
import {eq, gt} from "drizzle-orm";
import {match} from "../../db/schemas/schema.ts";
import type {Match, Team} from "../interfaces/match.ts";


export async function getFutureMatch(): Promise<Match[] | undefined> {
    return db.query.match.findMany({where: gt(match.utcDate, new Date())});
}

export async function getMatchById(id: number): Promise<Match | undefined> {
    return db.query.match.findFirst({where: eq(match.id, id)});
}

export async function getLiveMatch(): Promise<Match[] | undefined> {
    return db.query.match.findMany({where: eq(match.status, 'IN_PLAY')});
}
