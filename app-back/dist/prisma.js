import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";
const dbUrl = new URL(process.env.DATABASE_URL || "");
const adapter = new PrismaMariaDb({
    host: dbUrl.hostname,
    port: Number(dbUrl.port) || 3306,
    user: dbUrl.username,
    password: decodeURIComponent(dbUrl.password),
    database: dbUrl.pathname.replace(/^\//, ""), // Removes the leading slash from the DB name
});
export const prisma = new PrismaClient({ adapter });
//# sourceMappingURL=prisma.js.map