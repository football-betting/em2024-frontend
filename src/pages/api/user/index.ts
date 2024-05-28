import type { APIRoute } from "astro";
import {createUser} from "../../../lib/user.ts";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();

    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    let missingFields = [];

    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");

    if (missingFields.length > 0) {
        throw new Response(`Missing required fields: ${missingFields.join(', ')}`, {
            status: 400,
        });
    }

    try {
        await createUser({ email, password })
    } catch (error) {
        return new Response("Something went wrong", {
            status: 500,
        });
    }

    return redirect("/admin/user");
};
