import type { APIRoute } from "astro";
import {createUser, getUserByEmail} from "../../../lib/user.ts";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();

    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    const firstName = formData.get("firstName")?.toString();
    const lastName = formData.get("lastName")?.toString();
    const department = formData.get("department")?.toString();

    let missingFields = [];

    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");
    if (!firstName) missingFields.push("firstName");
    if (!lastName) missingFields.push("lastName");
    if (!department) missingFields.push("department");

    const checkUser = await getUserByEmail(email);
    if (checkUser) {
        return new Response(
            JSON.stringify({
                error: `User ${email} already exists`
            }), {
            status: 400,
        });
    }

    if (missingFields.length > 0) {
        throw new Response(`Missing required fields: ${missingFields.join(', ')}`, {
            status: 400,
        });
    }

    try {
        await createUser({ email, password, firstName, lastName, department})

        return new Response();
    } catch (error) {
        return new Response(
            JSON.stringify({
                error: "Username already used"
            }),
             {
            status: 500,
        });
    }
};
