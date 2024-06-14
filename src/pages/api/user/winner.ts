import type {APIContext, APIRoute} from "astro";
import {deleteUser, changeWinner} from "../../../lib/user.ts";

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

    const deadline = new Date('2024-06-14T21:00:00+02:00');
    const now = new Date();

    if (now > deadline) {
        return new Response(
            JSON.stringify({
                error: "Deadline has passed"
            }),
            {
                status: 401,
            }
        );
    }
    const userId = parseInt(context.locals.session.userId);


    const formData = await context.request.formData();

    let winner = formData.get("winner")?.toString();
    let secretWinner = formData.get("secretWinner")?.toString();

    let errors = [];

    if (!winner) {
        errors.push("Winner is missing");
    }
    if (!secretWinner) {
        errors.push("Secret Winner is missing");
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
        await changeWinner(winner, secretWinner, userId);

    } catch (error) {
        return new Response(
            JSON.stringify({
                error: "Error " + error.toString()
            }),
            {
                status: 500,
            });
    }
    return context.redirect("/user/" + userId);
};
