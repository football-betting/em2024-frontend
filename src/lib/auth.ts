import { Lucia } from "lucia";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import db from "../core/db.ts";
import {session, user} from "../../db/schemas/schema.ts";
import type {DatabaseUser} from "../interfaces/user.ts";

// @ts-ignore
const adapter = new DrizzleSQLiteAdapter(db, session, user);

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: !!import.meta.env.PROD
        }
    },
    getUserAttributes: (attributes) => {
        return {
            email: attributes.email,
        };
    }
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: Omit<DatabaseUser, "id">;
    }
}
