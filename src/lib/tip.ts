import db from "../core/db.ts";
import {and, eq} from "drizzle-orm";
import {tip} from "../../db/schemas/schema.ts";
import type {Tip} from "../interfaces/tip.ts";


export async function saveTip(userId: number, matchId: number, scoreHome: number, scoreAway: number) {
    const tipDb = await getTipByUserAndMatch(userId, matchId);
    if (tipDb) {
        tipDb.scoreHome = scoreHome;
        tipDb.scoreAway = scoreAway;

        tipDb.date = new Date();
        await db.update(tip).set(tipDb).where(eq(tip.id, tipDb.id));
        return;
    }

    await db.insert(tip).values({
            userId: userId,
            matchId: matchId,
            date: new Date(),
            scoreHome: scoreHome,
            scoreAway: scoreAway
    });
}

export async function getTipByUserAndMatch(userId: number, matchId: number): Promise<Tip | undefined> {
    const [tipResult] = await db.select().from(tip)
        .where(
            and(
                eq(tip.userId, userId),
                eq(tip.matchId, matchId)
            )
        ).limit(1);
    return tipResult;
}

export async function deleteTip(userId: number, matchId: number) {
    await db.delete(tip).where(and(eq(tip.userId, userId), eq(tip.matchId, matchId)));
}
