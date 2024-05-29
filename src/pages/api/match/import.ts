import type { APIRoute } from "astro";
import db from "../../../core/db.ts";
import {match} from "../../../../db/schemas/schema.ts";
import {eq} from "drizzle-orm";

export const POST: APIRoute = async ({ request }) => {
    try {
        const single_match = await request.json();
        let existing_match = await db
            .query
            .match
            .findFirst({where: eq(match.id, single_match.id)});

        if (existing_match) {
            await db.update(match).set({
                id: single_match.id,
                homeTeam: single_match.homeTeam,
                awayTeam: single_match.awayTeam,
                status: single_match.status,
                utcDate: new Date(single_match.utcDate),
                score: single_match.score,
                homeScore: single_match.homeScore,
                awayScore: single_match.awayScore
            }).where(eq(match.id, single_match.id));
        } else {
            await db.insert(match).values({
                id: single_match.id,
                homeTeam: single_match.homeTeam,
                awayTeam: single_match.awayTeam,
                status: single_match.status,
                utcDate: new Date(single_match.utcDate),
                score: single_match.score,
                homeScore: single_match.homeScore,
                awayScore: single_match.awayScore
            });
        }
    } catch (error) {
        console.error(error);
    }

    return new Response('OK bruder', { status: 200 });
};
