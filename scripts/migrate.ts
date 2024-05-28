import db from "../src/core/db";
import {migrate} from 'drizzle-orm/better-sqlite3/migrator';

try {
    migrate(db, {migrationsFolder: "./migrations/"});
    console.log("Migration erfolgreich durchgeführt.");
} catch (error) {
    console.error("Fehler beim Ausführen der Migration:", error);
}
