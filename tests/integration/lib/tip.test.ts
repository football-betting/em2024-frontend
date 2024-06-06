import {afterEach,  expect, test} from 'vitest'
import {deleteTip, getTipByUserAndMatch, saveTip} from '../../../src/lib/tip'
import db from "../../../src/core/db.ts";
import {eq} from "drizzle-orm";
import {tip} from "../../../db/schemas/schema.ts";

afterEach(async () => {
    await deleteTip(1,1);
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
