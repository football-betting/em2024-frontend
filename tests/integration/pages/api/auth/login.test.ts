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

    it('returns error when email is not registered', async () => {
        const mockContext = {
            request: {
                formData: vi.fn().mockResolvedValue({
                    get: vi.fn((key) => {
                        const data = {
                            email: 'test@test.com',
                            password: '1234'
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
        expect(jsonResponse.error).toBe('E-Mail ist bei uns nicht registriert.');
    });

    it('returns error when password is incorrect', async () => {
        const mockContext = {
            request: {
                formData: vi.fn().mockResolvedValue({
                    get: vi.fn((key) => {
                        const data = {
                            email: 'john@doe.com',
                            password: '1234'
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
        expect(jsonResponse.error).toBe('Falsche E-Mail oder falsches Passwort.');
    });

    it('returns success when login is successful', async () => {
        const mockContext = {
            request: {
                formData: vi.fn().mockResolvedValue({
                    get: vi.fn((key) => {
                        const data = {
                            email: 'john@doe.com',
                            password: 'test123'
                        };
                        return data[key];
                    }),
                }),

            },
            cookies: {
                info: null,
                set: vi.fn((name, value, attr) => {
                    mockContext.cookies.info = {
                        "name": name, "value": value, "attr": attr
                    };
                })
            },
            redirectInfo: null,
            redirect: vi.fn((redirect) => {
                    mockContext.redirectInfo = redirect;
            })
        };

        await POST(mockContext);

        expect(mockContext.redirectInfo).toBe("/");
        expect(mockContext.cookies.info.name).toBe('auth_session');
        expect(mockContext.cookies.info.value).toBeDefined();
        expect(mockContext.cookies.info.attr.httpOnly).toBeTruthy();
    });
});
