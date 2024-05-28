import { lucia } from "../../../lib/auth";
import { Argon2id } from "oslo/password";
import type { APIContext } from "astro";
import {getUserByEmail} from "../../../lib/user.ts";

export async function POST(context: APIContext): Promise<Response> {
    const formData = await context.request.formData();
    const email = formData.get("email");
    if (
        typeof email !== "string" ||
        email.length < 3 ||
        email.length > 31
    ) {
        return new Response(JSON.stringify({ error: "Invalid email" }), {
            status: 400
        });
    }

    const password = formData.get("password");
    if (typeof password !== "string" || password.length < 8 || password.length > 255) {
        return new Response(JSON.stringify({ error: "Invalid password" }), {
            status: 400
        });
    }

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return new Response(
            JSON.stringify({
                error: "Incorrect email or password"
            }),
            {
                status: 400
            }
        );
    }

    const validPassword = await new Argon2id().verify(existingUser.password, password);
    if (!validPassword) {
        return new Response(
            JSON.stringify({
                error: "Incorrect email or password"
            }),
            {
                status: 400
            }
        );
    }

    const session = await lucia.createSession(existingUser.id!.toString(), {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return context.redirect("/admin");
}
