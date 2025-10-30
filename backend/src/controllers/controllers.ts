import { NextFunction, Request, Response } from "express";
import { Models } from "../models/models";
import Config from "../config/config";
import fs from "fs-extra";

function createErrorLog() {
	const date = new Date();
	const dirPath = "./logs";
	fs.mkdir(dirPath, { recursive: true });
	function logger(err: unknown, username: string | undefined) {
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();

		const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
		const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

		if (err instanceof Error) {
			console.error(`[${hours}:${formattedMinutes}:${formattedSeconds} - ${username ? username : "unknown"}] ${err.message}`);
		} else {
			console.error(`[${hours}:${minutes}:${seconds} - ${username ?? "unknown"}]:`);
			console.error(err);
		}

		const filePath = dirPath + "/ErrorLogs";

		fs.appendFile(filePath, `[${hours}:${minutes}:${seconds} - ${username ?? "unknown"}]: ${err}`, (fsErr) => {
			if (fsErr) {
				console.error(fsErr);
			}
		});
	}
	return logger;
}

export class Controllers {
	protected models: Models;
	protected config: Config;
	protected logger: (err: unknown, username: string | undefined) => void;

	constructor(models: Models, config: Config) {
		this.models = models;
		this.config = config;
		this.logger = createErrorLog();
	}

	setAuthentication!: (res: Response, username: string) => void;
	getAuthentication!: (req: Request, res: Response, next: NextFunction) => void;
	handleSignout!: (req: Request, res: Response) => void;

	handleSignin!: (req: Request, res: Response) => void;
	handleSignup!: (req: Request, res: Response) => void;

	handleRoot!: (req: Request, res: Response) => void;
}
import "./components";
