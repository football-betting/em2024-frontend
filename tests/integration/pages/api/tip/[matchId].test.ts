import {afterAll, describe, expect, it, vi} from 'vitest';
import { POST } from '../../../../../src/pages/api/tip/[matchId]';
import db from "../../../../../src/core/db.ts";
import {tip} from "../../../../../db/schemas/schema.ts";
import {and, eq} from "drizzle-orm";

afterAll(async () => {

    await db.delete(tip)
        .where(
            and(
                eq(tip.userId, 1),
                eq(tip.matchId, 5)
            )
        );
})
describe('POST API Route', () => {
    it('returns error when user is not logged in', async () => {
        const mockContext = {
            locals: {
                session: null
            },
            request: {
                formData: vi.fn().mockResolvedValue({})
            },
            params: {
                matchId: '1'
            }
        };

        const response = await POST(mockContext);

        expect(response.status).toBe(401);
        expect(JSON.parse(await response.text()).error).toBe('user is not logged in');
    });

    it('returns error when UserId is not found', async () => {
        const mockContext = {
            locals: {
                session: {
                    userId: 'userId'
                }
            },
            request: {
                formData: vi.fn().mockResolvedValue({})
            },
            params: {
                matchId: '1'
            }
        };

        const response = await POST(mockContext);

        expect(response.status).toBe(401);

        const jsonResponse = await response.json();
        expect(jsonResponse.error).toBeDefined();
        expect(jsonResponse.error).toBe('UserId not found');
    });

    it('returns error when MatchId is not found', async () => {
        const mockContext = {
            locals: {
                session: {
                    userId: '1'
                }
            },
            request: {
                formData: vi.fn().mockResolvedValue({})
            },
            params: {

            }
        };

        const response = await POST(mockContext);

        expect(response.status).toBe(401);

        const jsonResponse = await response.json();
        expect(jsonResponse.error).toBeDefined();
        expect(jsonResponse.error).toBe('MatchId not found');
    });

    it('returns error when Match is not found', async () => {
        const mockContext = {
            locals: {
                session: {
                    userId: '1'
                }
            },
            request: {
                formData: vi.fn().mockResolvedValue({})
            },
            params: {
                matchId: '9999999'
            }
        };

        const response = await POST(mockContext);

        expect(response.status).toBe(401);

        const jsonResponse = await response.json();
        expect(jsonResponse.error).toBeDefined();
        expect(jsonResponse.error).toBe('Match not found');
    });

    it('returns error when tip values are out of range', async () => {
        const mockContext = {
            locals: {
                session: {
                    userId: '1'
                }
            },
            request: {
                formData: vi.fn().mockResolvedValue({
                    get: vi.fn((key) => {
                        const data = {
                            tip1: '21',
                            tip2: '-1'
                        };
                        return data[key];
                    }),
                })
            },
            params: {
                matchId: '5'
            }
        };

        const response = await POST(mockContext);

        expect(response.status).toBe(401);

        const jsonResponse = await response.json();
        expect(jsonResponse.error).toBeDefined();

        expect(jsonResponse.error).toContain('außerhalb des erlaubten Bereichs');
        expect(jsonResponse.error).toContain('tip1');
        expect(jsonResponse.error).toContain('tip2');
    });

    it('returns success when tip is saved correctly', async () => {
        const mockContext = {
            locals: {
                session: {
                    userId: '1'
                }
            },
            request: {
                formData: vi.fn().mockResolvedValue({
                    get: vi.fn((key) => {
                        const data = {
                            tip1: '2',
                            tip2: '1'
                        };
                        return data[key];
                    }),
                })
            },
            params: {
                matchId: '5'
            }
        };

        const response = await POST(mockContext);

        expect(response.status).toBe(200);

        const jsonResponse = await response.json();

        expect(jsonResponse.success).toBe(true);

        expect(jsonResponse.tip).toBeDefined();
        expect(jsonResponse.tip.matchId).toBe(5);
        expect(jsonResponse.tip.userId).toBe(1);
        expect(jsonResponse.tip.scoreHome).toBe(2);
        expect(jsonResponse.tip.scoreAway).toBe(1);
    });
});
