import type { APIRoute } from "astro";
import {createUser, getUserByEmail} from "../../../lib/user.ts";
import {Argon2id} from "oslo/password";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();

    const email = formData.get("email")?.toString();
    let password = formData.get("password")?.toString();

    const firstName = formData.get("firstName")?.toString();
    const lastName = formData.get("lastName")?.toString();
    const username = formData.get("username")?.toString();
    const department = formData.get("department")?.toString();
    const winner = formData.get("winner")?.toString();
    const secretWinner = formData.get("secretWinner")?.toString();

    let missingFields = [];

    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");
    if (!firstName) missingFields.push("firstName");
    if (!lastName) missingFields.push("lastName");
    if (!username) missingFields.push("username");
    if (!department) missingFields.push("department");
    if (!winner) missingFields.push("winner");
    if (!secretWinner) missingFields.push("secretWinner");

    if (missingFields.length > 0) {
        return new Response(
            JSON.stringify({
                error: `Missing required fields: ${missingFields.join(', ')}s`
            }), {
                status: 400,
            });
    }

    const checkUser = await getUserByEmail(email);

    if (checkUser) {
        return new Response(
            JSON.stringify({
                error: `User ${email} already exists`
            }), {
                status: 400,
        });
    }

    try {
        password = await new Argon2id().hash(password);
        await createUser({ email, password, firstName, lastName, username, department, winner, secretWinner})

        return redirect("/login?registered=true");
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
