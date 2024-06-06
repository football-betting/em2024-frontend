import {afterEach,  expect, test} from 'vitest'
import {getTipByUserAndMatch, saveTip, getTipByUserAndMatchIds} from '../../../src/lib/tip'
import db from "../../../src/core/db.ts";
import {and, eq} from "drizzle-orm";
import {tip} from "../../../db/schemas/schema.ts";

afterEach(async () => {
    await db.delete(tip).where(and(eq(tip.userId, 1)));
    await db.delete(tip).where(and(eq(tip.userId, 2)));
})

test("test tip", async () => {
    let result = await getTipByUserAndMatch(1,1);

    expect(result).toBeUndefined();

    await saveTip(1,1,3,2);

    result = await getTipByUserAndMatch(1,1);

    expect(result).toBeDefined();
    expect(result.userId).toBe(1);
    expect(result.matchId).toBe(1);
    expect(result.scoreHome).toBe(3);
    expect(result.scoreAway).toBe(2);

    await saveTip(1,1,1,3);

    result = await getTipByUserAndMatch(1,1);
    expect(result).toBeDefined();
    expect(result.userId).toBe(1);
    expect(result.matchId).toBe(1);
    expect(result.scoreHome).toBe(1);
    expect(result.scoreAway).toBe(3);
})

test("test update tipdate", async () => {

    let date = new Date();
    await saveTip(1,1,3,2);
    let result = await getTipByUserAndMatch(1,1);
    const currentDate = new Date();
    let dateOneSecondAgo = new Date(currentDate.getTime() - 1000);
    result.date = dateOneSecondAgo;
    await db.update(tip).set(result).where(eq(tip.id, result.id));

    await saveTip(1,1,1,3);

    result = await getTipByUserAndMatch(1,1);

    expect(result.date.getTime()).toBeGreaterThan(dateOneSecondAgo.getTime());
})

test("test getTipByUserAndMatchIds", async () => {
    await saveTip(1,1,3,3);
    await saveTip(1,2,1,2);
    await saveTip(1,3,4,1);
    await saveTip(2,3,2,3);

    let result = await getTipByUserAndMatchIds(1, [1,3]);

    expect(result.length).toBe(2);
    expect(result[0].userId).toBe(1);
    expect(result[0].matchId).toBe(1);
    expect(result[0].scoreHome).toBe(3);
    expect(result[0].scoreAway).toBe(3);

    expect(result[1].userId).toBe(1);
    expect(result[1].matchId).toBe(3);
    expect(result[1].scoreHome).toBe(4);
    expect(result[1].scoreAway).toBe(1);
})

test("test getTipByUserAndMatchIds when not found", async () => {
    let result = await getTipByUserAndMatchIds(1, [1,3]);
    expect(result.length).toBe(0);

    result = await getTipByUserAndMatchIds(1, []);
    expect(result.length).toBe(0);
})
