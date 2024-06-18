import {describe, expect, it} from 'vitest';
import { filterValidGames, formatDate, extractTime, abbreviateUsername } from './../../../src/lib/function.ts';

describe('filterValidGames', () => {
    it('returns true when game has valid homeTeam and awayTeam', () => {
        const game = [{
            homeTeam: { name: 'Team A' },
            awayTeam: { name: 'Team B' }
        },
            {
                homeTeam: { name: null },
                awayTeam: { name: 'Team B' }
            }];
        const validGames = game.filter(filterValidGames);
        expect(validGames.length).toBe(1);
    });

    it('returns false when game does not have valid homeTeam or awayTeam', () => {
        const game = [{
            homeTeam: { name: null },
            awayTeam: { name: 'Team B' }
        }];
        const validGames = game.filter(filterValidGames);
        expect(validGames.length).toBe(0);
    });
});

describe('formatDate', () => {
    it('formats date correctly', () => {
        const date = new Date(2022, 11, 31).getTime();
        expect(formatDate(date)).toBe('Samstag, 31. Dezember 2022');
    });
});

describe('extractTime', () => {
    it('extracts time correctly', () => {
        const date = new Date(2022, 11, 31, 13, 45).getTime();
        expect(extractTime(date)).toBe('13:45');
    });
});

describe('abbreviateUsername', () => {
    it('abbreviates long username correctly', () => {
        const username = 'verylongusername1234567890';
        expect(abbreviateUsername(username)).toBe('verylonguserna...');
    });

    it('does not abbreviate short username', () => {
        const username = 'shortname';
        expect(abbreviateUsername(username)).toBe('shortname');
    });
});
