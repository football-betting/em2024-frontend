import db from "../src/core/db";
import * as schema from "../db/schemas/schema";
import {Argon2id} from "oslo/password";




const users = [
    { email: 'john@doe.com', firstName: 'John', lastName: 'Doe', department: 'Langenfeld' },
    { email: 'toni@kroos.de', firstName: 'Toni', lastName: 'Kroos', department: 'Langenfeld' },
    { email: 'philipp@lahm.de', firstName: 'Philipp', lastName: 'Lahm', department: 'Langenfeld' },
    { email: 'lukas@podolski.pl', firstName: 'Lukas', lastName: 'Podolski', department: 'Langenfeld' },
    { email: 'robbie@fowler.com', firstName: 'Robbie', lastName: 'Fowler', department: 'London' },
    { email: 'bobby@moore.com', firstName: 'Bobby', lastName: 'Moore', department: 'London' },
    { email: 'steve@mcmanaman.com', firstName: 'Steve', lastName: 'McManaman', department: 'London' }
];

console.log('Import users...');
for (const user of users) {
    try {
        await db.insert(schema.user).values({
            email: user.email,
            password: await new Argon2id().hash('test123'),
            firstName: user.firstName,
            lastName: user.lastName,
            department: user.department
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
        homeTeam: JSON.stringify(land.en),
        awayTeam: JSON.stringify(land.nl),
        status: "scheduled",
        utcDate: new Date(now.getTime() + 3600000),
        score: null,
        homeScore: null,
        awayScore: null
    },
    {
        id: 2,
        homeTeam: JSON.stringify(land.pl),
        awayTeam: JSON.stringify(land.fr),
        status: "scheduled",
        utcDate: new Date(now.getTime() - 1800000),
        score: JSON.stringify({ current: '0:0' }),
        homeScore: 0,
        awayScore: 0
    },
    {
        id: 3,
        homeTeam: JSON.stringify(land.de),
        awayTeam: JSON.stringify(land.es),
        status: "scheduled",
        utcDate: new Date(now.getTime() - 86400000),
        score: null,
        homeScore: 4,
        awayScore: 2
    },
    {
        id: 4,
        homeTeam: JSON.stringify(land.fr),
        awayTeam: JSON.stringify(land.en),
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



