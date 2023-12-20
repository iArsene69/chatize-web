import { migrate } from "drizzle-orm/postgres-js/migrator";
import db from "./db";

const migrateDB = async () => {
  try {
    console.log("🔃 Migrating Database");
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("✅ Successfully migrated database");
  } catch (error) {
    console.error("❌ Failed to migrate database --error:", error);
  }
};

migrateDB().finally(() => {
  process.exit();
});
