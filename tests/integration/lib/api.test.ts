import { beforeEach, expect, test, describe, vi } from 'vitest';
import { getRating } from '../../../src/lib/api';

describe('getRating', () => {
    global.fetch = vi.fn()

    function createFetchResponse(data) {
        return { json: () => new Promise((resolve) => resolve(data)) }
    }

    beforeEach(() => {
        global.fetch.mockReset()
    })

    test('returns top three and userAndNeighbors when user position is greater than 0', async () => {
        const mockData = {
            table: {
                global: [
                    { user_id: 1 },
                    { user_id: 2 },
                    { user_id: 3 },
                    { user_id: 4 },
                    { user_id: 5 },
                    { user_id: 6 },
                    { user_id: 7 },
                ],
            },
        };

        // Setze die Implementation des Mocks
        fetch.mockResolvedValue(createFetchResponse(mockData))

        const result = await getRating(5);

        expect(result).toEqual({
            topThree: mockData.table.global.slice(0, 3),
            userAndNeighbors: mockData.table.global.slice(3, 6),
        });
    });

    test('returns top six when user position is 0', async () => {
        const mockData = {
            table: {
                global: [
                    { user_id: 1 },
                    { user_id: 2 },
                    { user_id: 3 },
                    { user_id: 4 },
                    { user_id: 5 },
                    { user_id: 6 },
                    { user_id: 7 },
                ],
            },
        };
        fetch.mockResolvedValue(createFetchResponse(mockData))

        const result = await getRating(1);
        expect(result).toEqual({
            topThree: mockData.table.global.slice(0, 6),
            userAndNeighbors: [],
        });
    });

    test('returns empty arrays when global table is empty', async () => {
        const mockData = {
            table: {
                global: [],
            },
        };
        fetch.mockResolvedValue(createFetchResponse(mockData))

        const result = await getRating(1);
        expect(result).toEqual({
            topThree: [],
            userAndNeighbors: [],
        });
    });
});
