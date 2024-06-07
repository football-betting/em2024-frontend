import type {APIContext, APIRoute} from "astro";
import {getMatchById} from "../../../lib/match.ts";
import {saveTip, getTipByUserAndMatch} from "../../../lib/tip.ts";


export const POST: APIRoute = async (context: APIContext) => {

    if(!context.locals.session || !context.locals.session.userId) {
        return new Response(
            JSON.stringify({
                error: "user is not logged in"
            }),
            {
                status: 401,
            }
        );
    }
    const userId = parseInt(context.locals.session.userId);

    if(isNaN(userId) || !userId) {
        return new Response(
            JSON.stringify({
                error: "UserId not found"
            }),
            {
                status: 401,
            }
        );
    }

    const matchId = parseInt(context.params.matchId);

    if(isNaN(matchId) || !matchId) {
        return new Response(
            JSON.stringify({
                error: "MatchId not found"
            }),
            {
                status: 401,
            }
        );
    }

    const match = await getMatchById(matchId);

    if(!match) {
        return new Response(
            JSON.stringify({
                error: "Match not found"
            }),
            {
                status: 401,
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
                status: 401,
            }
        );
    }

    const formData = await context.request.formData();

    let tip1Value = formData.get("tip1")?.toString();
    let tip2Value = formData.get("tip2")?.toString();

    const tip1 = parseInt(tip1Value, 10);
    const tip2 = parseInt(tip2Value, 10);

    let errors = [];
    if (isNaN(tip1) || tip1 < 0 || tip1 > 20) {
        errors.push("Die Eingabe für 'tip1' ist außerhalb des erlaubten Bereichs (0-20).");
    }

    if (isNaN(tip2) || tip2 < 0 || tip2 > 20) {
        errors.push("Die Eingabe für 'tip2' ist außerhalb des erlaubten Bereichs (0-20).");
    }

    if(errors.length > 0) {
        return new Response(
            JSON.stringify({
                error: "Error " + errors.join(", ")
            }),
            {
                status: 401,
            });
    }

    try {
        await saveTip(userId, matchId, tip1, tip2);

        const userTip = await getTipByUserAndMatch(userId, matchId);

        return new Response(
            JSON.stringify({
                success: true,
                tip: userTip
            }),
        );
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
