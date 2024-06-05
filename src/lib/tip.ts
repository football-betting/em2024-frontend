import db from "../core/db.ts";
import {eq} from "drizzle-orm";
import {tip} from "../../db/schemas/schema.ts";
import type {Tip} from "../interfaces/tip.ts";



export async function createUser(newTip: Tip) {
    await db.insert(tip).values({
        userId: newTip.userId,
        matchId: newTip.matchId,
        date: newTip.date,
        scoreHome: newTip.scoreHome,
        scoreAway: newTip.scoreAway
    });
}

export async function updateUser(newTip: Tip) {
    await db.update(tip).set(newTip).where(eq(tip.id, newTip.id));
}

