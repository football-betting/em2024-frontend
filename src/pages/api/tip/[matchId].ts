import type {APIContext, APIRoute} from "astro";
import {getMatchById} from "../../../lib/match.ts";

export const GET: APIRoute = async (context: APIContext) => {

    console.log(context, context.locals.session.userId);
    if(!context.locals.session || !context.locals.session.userId) {
        return new Response('user is not logged in', {
            status: 401
        });
    }
    const userId = context.locals.session.userId;

    const matchId = parseInt(context.params.matchId);
    if(isNaN(matchId) || !matchId) {
        return new Response('MatchId not found', {
            status: 401
        });
    }

    const match = await getMatchById(matchId);

    if(!match) {
        return new Response(
            JSON.stringify({
                error: "Match not found"
            }),
            {
                status: 500,
            }
        );
    }

    const now = new Date();
    const matchDate = new Date(match.utcDate);

    if (matchDate < now || match.homeScore !== null || match.awayScore !== null) {
        return new Response(
            JSON.stringify({
                error: "For games in the past you can not type"
            }),
            {
                status: 500,
            }
        );
    }

    let tip1Value = context.url.searchParams.get("tip1")?.toString();
    let tip2Value = context.url.searchParams.get("tip2")?.toString();

    const tip1 = parseInt(tip1Value, 10);
    const tip2 = parseInt(tip2Value, 10);

    let errors = [];
    if (isNaN(tip1) || tip1 < 0 || tip1 > 20) {
        console.error("Die Eingabe für 'tip1' ist außerhalb des erlaubten Bereichs (0-20).");
        errors.push("Die Eingabe für 'tip1' ist außerhalb des erlaubten Bereichs (0-20).");
    }

    if (isNaN(tip2) || tip2 < 0 || tip2 > 20) {
        console.error("Die Eingabe für 'tip2' ist außerhalb des erlaubten Bereichs (0-20).");
        errors.push("Die Eingabe für 'tip2' ist außerhalb des erlaubten Bereichs (0-20).");
    }

    if(!tip1 || !tip2) {
        return new Response('Tip not found', {
            status: 401
        });
    }

    console.log(tip1, tip2, matchId, userId )

    try {
        password = await new Argon2id().hash(password);
        await createUser({ email, password, firstName, lastName, department, winner, secretWinner})

        return new Response();
    } catch (error) {
        return new Response(
            JSON.stringify({
                error: "Error " + error.toString()
            }),
             {
            status: 500,
        });
    }
};
