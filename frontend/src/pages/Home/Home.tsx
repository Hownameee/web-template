import { useNavigate } from "react-router";

function Home() {
	const navigate = useNavigate();

	const handleLogout = async () => {
		await fetch("/api/logout", { credentials: "include", method: "POST" });
		await navigate("/login");
	};
	return (
		<>
			<button onClick={handleLogout}>logout</button>
		</>
	);
}
export default Home;
