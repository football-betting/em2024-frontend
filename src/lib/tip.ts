import db from "../core/db.ts";
import {and, eq, inArray} from "drizzle-orm";
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

export async function getTipByUserAndMatchIds(userId: number, matchIds: number[]): Promise<Tip[]> {
    if(matchIds.length === 0) {
        return [];
    }
    return db.select().from(tip)
        .where(
            and(
                eq(tip.userId, userId),
                inArray(tip.matchId, matchIds),
            )
        );
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

