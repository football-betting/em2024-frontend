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

export async function getAllUser(): Promise<DatabaseUser[] | undefined> {
    return db.select().from(user);
}

export async function createUser(newUser: DatabaseUser) {
    await db.insert(user).values({
        email: newUser.email,
        password: newUser.password,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        department: newUser.department,
        winner: newUser.winner,
        secretWinner: newUser.secretWinner
    });
}

export async function updateUser(newUser: DatabaseUser) {
    await db.update(user).set(newUser).where(eq(user.id, newUser.id));
}

export async function deleteUser(id: number) {
    await db.delete(user).where(eq(user.id, id));
}
