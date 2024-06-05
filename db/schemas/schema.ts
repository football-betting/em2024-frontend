import {integer, sqliteTable, text} from "drizzle-orm/sqlite-core";

export const match = sqliteTable('match', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: false }),
    homeTeam: text('homeTeam', { mode: 'json' }).notNull(),
    awayTeam: text('awayTeam', { mode: 'json' }).notNull(),
    status: text('status').notNull(),
    utcDate: integer('utcDate', { mode: 'timestamp' }).notNull(),
    score: text('score', { mode: 'json' }),
    homeScore: integer('homeScore'),
    awayScore: integer('awayScore'),
})

export const user = sqliteTable('user', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    firstName: text('firstName').notNull(),
    lastName: text('lastName').notNull(),
    department: text('department').notNull(),
    winner: text('winner').notNull(),
    secretWinner: text('secretWinner').notNull(),
})

export const session = sqliteTable('session', {
    id: text("id").notNull().primaryKey(),
    userId: integer('user_id').references(() => user.id),
    expiresAt: integer('expires_at').notNull(),
})

export const tip = sqliteTable('tip', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    userId: integer('user_id').references(() => user.id),
    matchId: integer('match_id').references(() => match.id),
    date: integer('date', { mode: 'timestamp' }).notNull(),
    scoreHome: integer('score_home', { mode: 'number' }).notNull(),
    scoreAway: integer('score_away', { mode: 'number' }).notNull(),
})
