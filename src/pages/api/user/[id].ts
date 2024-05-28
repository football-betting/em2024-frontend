import type { APIRoute } from "astro";
import {deleteUser, updateUser} from "../../../lib/user.ts";

export const POST: APIRoute = async ({ params, redirect, request }) => {
    const formData = await request.formData();

    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const checkPw = formData.get("checkPw")?.toString();

    let missingFields = [];

    if (!email) missingFields.push("email");

    if (missingFields.length > 0) {
        throw new Response(`Missing required fields: ${missingFields.join(', ')}`, {
            status: 400,
        });
    }

    if (!params.id) {
        return new Response("Cannot find service", {
            status: 404,
        });
    }

    try {
        if (password && checkPw) {
            await updateUser({
                id: params.id as unknown as number,
                email: email,
                password: password,
            })
        } else {
            await updateUser({
                id: params.id as unknown as number,
                email: email,
            })
        }
    } catch (error) {
        return new Response("Something went wrong", {
            status: 500,
        });
    }
    return redirect("/admin/user");
};

export const DELETE: APIRoute = async ({ params, redirect }) => {
    if (!params.id) {
        return new Response("Cannot find user", {
            status: 404,
        });
    }

    try {
        await deleteUser(params.id as unknown as number);
    } catch (error) {
        return new Response("Something went wrong", {
            status: 500,
        });
    }
    return redirect("/admin/user");
};
