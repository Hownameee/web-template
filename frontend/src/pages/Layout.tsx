import { Outlet, useLoaderData } from "react-router";

export default function Layout() {
	const username = useLoaderData();
	return (
		<>
			<div>Layout</div>
			<h1>hello {username}</h1>
			<Outlet />
		</>
	);
}
