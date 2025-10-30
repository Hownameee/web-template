import { randomBytes } from "crypto";

export default class Config {
	public readonly jwtSecret: string;
	public readonly PORT: number;

	constructor() {
		this.jwtSecret = randomBytes(64).toString("hex");
		this.PORT = 4000;
	}
}
