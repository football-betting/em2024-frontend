import db from "../src/core/db";
import * as schema from "../db/schemas/schema";
import {eq} from "drizzle-orm";
import {Argon2id} from "oslo/password";


const adminUser = await db.query.user.findFirst({where: eq(schema.user.email, 'admin@email.com')});

if (!adminUser) {
    await db.insert(schema.user).values(
        {
            email: 'admin@email.com',
            password: await new Argon2id().hash('admin123'),
        }
    )

    console.log("Admin created with");
    console.log("Email admin@email.com");
    console.log("Password admin123");
}



