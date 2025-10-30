CREATE TABLE IF NOT EXISTS "user" (
	"user_id" BLOB PRIMARY KEY,
	"user_name" TEXT UNIQUE NOT NULL,
	"user_password" TEXT NOT NULL,
	"user_avatar" BLOB
);