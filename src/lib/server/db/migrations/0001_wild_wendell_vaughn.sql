ALTER TABLE "users" ADD COLUMN "salt" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "hashedPassword" text;