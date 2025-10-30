import sqlite3 from "sqlite3";
import fs from "fs-extra";
import { User, Result } from "./type";

export type Query<T = unknown> = { ok: true; data: T } | { ok: false; err: Error };

export class Models {
	protected db: sqlite3.Database;

	constructor(db: sqlite3.Database) {
		this.db = db;
	}

	insertUser!: (username: string, password: string) => Promise<Query<Result>>;
	selectPasswordByUsername!: (username: string) => Promise<Query<User>>;
}

async function getDBInit(path: string) {
	const dbstring = await fs.readFile(path);
	return dbstring.toString();
}

export default async function openDB() {
	const sqlite = sqlite3.verbose();
	const db = new sqlite.Database("src/models/app.db", (err) => {
		if (err) {
			console.error(err);
			return;
		}
	});
	const dbInit: string = await getDBInit("src/models/schema.sql");
	db.exec(dbInit);
	return new Models(db);
}
import "./components";
