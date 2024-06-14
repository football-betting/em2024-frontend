import db from "../core/db.ts";
import {eq} from "drizzle-orm";
import {user} from "../../db/schemas/schema.ts";
import type {DatabaseUser} from "../interfaces/user.ts";

export async function getUserByEmail(email: string): Promise<DatabaseUser | undefined> {
    return db.query.user.findFirst({where: eq(user.email, email)});
}

export async function getUserById(id: number): Promise<DatabaseUser | undefined> {
    return db.query.user.findFirst({where: eq(user.id, id)});
}

export async function createUser(newUser: DatabaseUser) {
    await db.insert(user).values({
        email: newUser.email,
        password: newUser.password,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        department: newUser.department,
        winner: newUser.winner,
        secretWinner: newUser.secretWinner
    });
}

export async function changeWinner(winner, secretWinner, id: number) {
    const dbUser = await getUserById(id);
    dbUser.winner = winner;
    dbUser.secretWinner = secretWinner;

    await db.update(user).set(dbUser).where(eq(user.id, id));
}

export async function deleteUser(id: number) {
    await db.delete(user).where(eq(user.id, id));
}
