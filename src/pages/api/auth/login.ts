import { lucia } from "../../../lib/auth";
import { Argon2id } from "oslo/password";
import type { APIContext } from "astro";
import {getUserByEmail} from "../../../lib/user.ts";

export async function POST(context: APIContext): Promise<Response> {
    const formData = await context.request.formData();
    const email = formData.get("email");
    if (
        typeof email !== "string" ||
        email.length < 3
    ) {
        return new Response(JSON.stringify({ error: "Ungültige E-Mail" }), {
            status: 400
        });
    }

    const password = formData.get("password");
    if (typeof password !== "string" || password.length < 4 || password.length > 255) {
        return new Response(JSON.stringify({ error: "Ungültiges Passwort" }), {
            status: 400
        });
    }

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return new Response(
            JSON.stringify({
                error: "E-Mail ist bei uns nicht registriert."
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
                error: "Falsche E-Mail oder falsches Passwort."
            }),
            {
                status: 400
            }
        );
    }

    const session = await lucia.createSession(existingUser.id!.toString(), {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return context.redirect("/");
}
