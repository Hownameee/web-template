import express from "express";
import { Controllers } from "../controllers/controllers";
import { Views } from "../views/view";
import cookieParser from "cookie-parser";

export default function serveRoute(controller: Controllers, view: Views) {
	const router = express();

	router.use(express.raw({ type: "application/x-protobuf" }));
	router.use(cookieParser());
	router.use(express.static("src/views/gen"));

	router.post("/api/login", (req, res) => controller.handleSignin(req, res));
	router.post("/api/signup", (req, res) => controller.handleSignup(req, res));
	router.post("/api/logout", (req, res) => controller.handleSignout(req, res));
	router.get(
		"/api",
		(req, res, next) => controller.getAuthentication(req, res, next),
		(req, res) => controller.handleRoot(req, res),
	);

	router.get("/{*splat}", (req, res) => view.handleSPA(req, res));
	return router;
}
