import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/Signup/Signup";
import { HomeLoader } from "./loader";
import Layout from "src/pages/Layout";

export const router = createBrowserRouter([
	{ path: "/", Component: Layout, loader: HomeLoader, children: [{ index: true, Component: Home }] },
	{ path: "/login", Component: Login },
	{ path: "/signup", Component: SignUp },
]);
