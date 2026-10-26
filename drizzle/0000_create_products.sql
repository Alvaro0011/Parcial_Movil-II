CREATE TABLE IF NOT EXISTS "products" (
	"id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	"client_id" text NOT NULL UNIQUE,
	"name" text NOT NULL,
	"quantity" integer NOT NULL,
	"price" integer NOT NULL,
	"updated_at" integer NOT NULL,
	"synced_at" integer
);
