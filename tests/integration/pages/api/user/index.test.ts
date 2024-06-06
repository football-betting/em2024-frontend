import {afterAll, describe, expect, it, vi} from 'vitest';
import {POST} from '../../../../../src/pages/api/user';
import {getUserByEmail} from "../../../../../src/lib/user.ts";
import db from "../../../../../src/core/db.ts";
import {eq} from "drizzle-orm";
import {user} from "../../../../../db/schemas/schema.ts";
import {Argon2id} from "oslo/password";

afterAll(async () => {
    await db.delete(user).where(eq(user.email, 'test@example.com'));
})

function getMockData() {
    return {
        get: vi.fn((key) => {
            const data = {
                email: 'test@example.com',
                password: 'password123!&/!',
                firstName: 'Test',
                lastName: 'User',
                username: 'testuser',
                department: 'Test Department',
                winner: 'DEU',
                secretWinner: 'POL'
            };
            return data[key];
        }),
    };
}

describe('POST API Route', () => {
    it('should handle formData correctly', async () => {
        const mockRequest = {
            formData: vi.fn().mockResolvedValue(getMockData())
        };

        const mockRedirect = vi.fn();

        await POST({request: mockRequest, redirect: mockRedirect});

        expect(mockRedirect).toHaveBeenCalledWith('/login?registered=true');

        const expectResult = await getUserByEmail('test@example.com');

        expect(expectResult.email).toBe('test@example.com');
        expect(expectResult.firstName).toBe('Test');
        expect(expectResult.lastName).toBe('User');
        expect(expectResult.username).toBe('testuser');
        expect(expectResult.department).toBe('Test Department');
        expect(expectResult.winner).toBe('DEU');
        expect(expectResult.secretWinner).toBe('POL');

        const validPassword = await new Argon2id().verify(expectResult.password, 'password123!&/!');
    });

    it('should return error if user already exists', async () => {

        const mockRequest = {
            formData: vi.fn().mockResolvedValue(getMockData())
        };

        const mockRedirect = vi.fn();

        const response = await POST({request: mockRequest, redirect: mockRedirect});

        expect(response.status).toBe(400);
        expect(JSON.parse(await response.text()).error).toBe('User test@example.com already exists');
    });

    it('should return error if required fields are missing', async () => {
        // Mock formData with missing fields
        const mockFormData = {
            get: vi.fn((key) => {
                const data = {
                    email: 'test@example.com',
                    password: 'password123!&/!',
                    firstName: 'Test',
                    lastName: 'User',
                    // username field is missing
                    // department field is missing
                    winner: 'DEU',
                    secretWinner: 'POL'
                };
                return data[key];
            }),
        };

        const mockRequest = {
            formData: vi.fn().mockResolvedValue(mockFormData)
        };

        const mockRedirect = vi.fn();

        const response = await POST({request: mockRequest, redirect: mockRedirect});

        expect(response.status).toBe(400);
        const jsonResponse = await response.json();
        expect(jsonResponse.error).toBeDefined;
        expect(jsonResponse.error).toBe('Missing required fields: username, departments');
    });
});
