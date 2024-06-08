import { describe, expect, it, vi } from 'vitest';
import { POST } from '../../../../../src/pages/api/auth/login';

describe('POST API Route', () => {
    it('returns error when email is invalid', async () => {
        const mockContext = {
            request: {
                formData: vi.fn().mockResolvedValue({
                    get: vi.fn(() => 'a@')
                })
            }
        };

        const response = await POST(mockContext);

        expect(response.status).toBe(400);
        const jsonResponse = await response.json();
        expect(jsonResponse.error).toBeDefined();
        expect(jsonResponse.error).toBe('Ungültige E-Mail');
    });

    it('returns error when password is invalid', async () => {
        const mockContext = {
            request: {
                formData: vi.fn().mockResolvedValue({
                    get: vi.fn((key) => {
                        const data = {
                            email: 'test@test.com',
                            password: '123'
                        };
                        return data[key];
                    }),
                })
            }
        };

        const response = await POST(mockContext);

        expect(response.status).toBe(400);
        const jsonResponse = await response.json();
        expect(jsonResponse.error).toBeDefined();
        expect(jsonResponse.error).toBe('Ungültiges Passwort');
    });
});
