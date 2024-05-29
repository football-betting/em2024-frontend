import db from "../core/db.ts";
import {gt} from "drizzle-orm";
import {match} from "../../db/schemas/schema.ts";
import type {Match, Team} from "../interfaces/match.ts";


export async function getFutureMatch(): Promise<Match[] | undefined> {
    return db.query.match.findMany({where: gt(match.utcDate, new Date())});
}

export async function getAllMatch(): Promise<Match[] | undefined> {
    const results = await db.select().from(match);
    return mapMatches(results);
}

function mapMatches(matches: any[]): Match[] {
    return matches.map(match => ({
        ...match,
        homeTeam: typeof match.homeTeam === 'string' ? safelyParseJSON(match.homeTeam) : null,
        awayTeam: typeof match.awayTeam === 'string' ? safelyParseJSON(match.awayTeam) : null,
        utcDate: new Date(match.utcDate)
    }));
}

function safelyParseJSON(jsonString: string): Team | null {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return null;
    }
}
