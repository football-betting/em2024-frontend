import db from "../src/core/db";
import * as schema from "../db/schemas/schema";
import {Argon2id} from "oslo/password";




const users = [
    { email: 'john@doe.com', firstName: 'John', lastName: 'Doe', username: 'JohnDoe',department: 'Langenfeld', winner: 'DEU', secretWinner: 'ENG' },
    { email: 'toni@kroos.de', firstName: 'Toni', lastName: 'Kroos', username: 'ToniKroos',department: 'Langenfeld', winner: 'DEU', secretWinner: 'FRA' },
    { email: 'philipp@lahm.de', firstName: 'Philipp', lastName: 'Lahm', username: 'PhilippLahm',department: 'Langenfeld', winner: 'ESP', secretWinner: 'ENG' },
    { email: 'lukas@podolski.pl', firstName: 'Lukas', lastName: 'Podolski', username: 'LukasPodolski',department: 'Langenfeld', winner: 'POL', secretWinner: 'DEU' },
    { email: 'robbie@fowler.com', firstName: 'Robbie', lastName: 'Fowler', username: 'RobbieFowler',department: 'London', winner: 'NLD', secretWinner: 'ENG' },
    { email: 'bobby@moore.com', firstName: 'Bobby', lastName: 'Moore', username: 'BobbyMoore',department: 'London', winner: 'ENG', secretWinner: 'DEU' },
    { email: 'steve@mcmanaman.com', firstName: 'Steve', lastName: 'McManaman', username: 'SteveMcManaman',department: 'London', winner: 'FRA', secretWinner: 'ENG' }
];

console.log('Import users...');
for (const user of users) {
    try {
        await db.insert(schema.user).values({
            email: user.email,
            password: await new Argon2id().hash('test123'),
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            department: user.department,
            winner: user.winner,
            secretWinner: user.secretWinner
        });
        console.log(`User inserted: ${user.email}`);
    } catch (error) {
        console.error(`Error inserting user ${user.email}:`, error);
    }
}
console.log('Finished importing users.');
console.log('----');



const land = {
    en: {
        crest: "https://crests.football-data.org/770.svg",
        tla: "ENG"
    },
    nl: {
        crest: "https://crests.football-data.org/8601.svg",
        tla: "NED"
    },
    pl: {
        crest: "https://crests.football-data.org/794.svg",
        tla: "POL"
    },
    fr: {
        crest: "https://crests.football-data.org/773.svg",
        tla: "FRA"
    },
    de: {
        crest: "https://crests.football-data.org/759.svg",
        tla: "GER"
    },
    es: {
        crest: "https://crests.football-data.org/760.svg",
        tla: "ESP"
    },
};


const now = new Date();
const games = [
    {
        id: 1,
        homeTeam: land.de,
        awayTeam: land.es,
        status: "scheduled",
        utcDate: new Date(now.getTime() - 86400000),
        score: null,
        homeScore: 4,
        awayScore: 2
    },
    {
        id: 2,
        homeTeam: land.pl,
        awayTeam: land.fr,
        status: "scheduled",
        utcDate: new Date(now.getTime() - 1800000),
        score: { current: '0:0' },
        homeScore: 0,
        awayScore: 0
    },
    {
        id: 3,
        homeTeam: land.en,
        awayTeam: land.nl,
        status: "scheduled",
        utcDate: new Date(now.getTime() + 3600000),
        score: null,
        homeScore: null,
        awayScore: null
    },
    {
        id: 4,
        homeTeam: land.fr,
        awayTeam: land.en,
        status: "scheduled",
        utcDate: new Date(now.getTime() + 86400000),
        score: null,
        homeScore: null,
        awayScore: null
    }
];

console.log('Import games...');
for (const game of games) {
    try {
        await db.insert(schema.match).values({
            id: game.id,
            homeTeam: game.homeTeam,
            awayTeam: game.awayTeam,
            status: game.status,
            utcDate: game.utcDate,
            score: game.score,
            homeScore: game.homeScore,
            awayScore: game.awayScore
        });
        console.log(`Match inserted: ${game.id}`);
    } catch (error) {
        console.error(`Error inserting user ${game.id}:`, error);
    }
}



