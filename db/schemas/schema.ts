import {integer, sqliteTable, text} from "drizzle-orm/sqlite-core";

export const match = sqliteTable('match', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: false }),
    homeTeam: text('homeTeam', { mode: 'json' }).notNull(),
    awayTeam: text('awayTeam', { mode: 'json' }).notNull(),
    status: text('status').notNull(),
    utcDate: integer('end', { mode: 'timestamp' }).notNull(),
    score: text('score', { mode: 'json' }),
    homeScore: integer('homeScore'),
    awayScore: integer('awayScore'),
})

export const user = sqliteTable('user', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
})

export const session = sqliteTable('session', {
    id: text("id").notNull().primaryKey(),
    userId: integer('user_id').references(() => user.id),
    expiresAt: integer('expires_at').notNull(),
})
