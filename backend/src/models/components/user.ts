import { Models, Query } from "../models";
import { User, Result } from "../type";
import { v7 } from "uuid";

Models.prototype.insertUser = async function (username: string, password: string): Promise<Query<Result>> {
	const id = v7();
	return new Promise((resolve) => {
		this.db.run(`INSERT INTO user(user_id, user_name, user_password) VALUES (?, ?, ?)`, [id, username, password], function (err) {
			if (err) {
				resolve({ ok: false, err: err });
			} else {
				resolve({ ok: true, data: { result: true } });
			}
		});
	});
};

Models.prototype.selectPasswordByUsername = async function (username: string): Promise<Query<User>> {
	if (username.length <= 0) {
		throw new Error("Username cannot be empty");
	}

	return new Promise<Query<User>>((resolve) => {
		this.db.get(`SELECT user_password FROM user WHERE user_name = ?`, [username], (err, row: User) => {
			if (err) {
				resolve({ ok: false, err: err });
			} else {
				resolve({ ok: true, data: row });
			}
		});
	});
};
