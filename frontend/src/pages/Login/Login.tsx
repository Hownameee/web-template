import { create, fromBinary, toBinary } from "@bufbuild/protobuf";
import { useState, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { LoginRequestSchema, type LoginRequest } from "src/lib/gen/auth_pb";
import { ResponseSchema, Status } from "src/lib/gen/response_pb";

export default function Login() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const redirectTo = searchParams.get("redirect") || "/";
	const signupUrl = redirectTo && redirectTo !== "/" ? `/signup?redirect=${encodeURIComponent(redirectTo)}` : "/signup";

	const [errorMessage, setErrorMessage] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const login: LoginRequest = create(LoginRequestSchema, { username: username, password: password });
		const bytes = toBinary(LoginRequestSchema, login);

		try {
			const res = await fetch("/api/login", { method: "POST", headers: { "Content-Type": "application/x-protobuf" }, body: bytes });

			const data = await res.arrayBuffer();
			const result = fromBinary(ResponseSchema, new Uint8Array(data));

			if (result.status == Status.FAILED) {
				setErrorMessage(result.message);
				return;
			}
			navigate("/", { replace: true });
		} catch {
			setErrorMessage("Cannot connect to server, please try again.");
		}
	};

	return (
		<>
			{!(errorMessage === "") && <div>{errorMessage}</div>}
			<form onSubmit={(e) => handleSubmit(e)} style={{ display: "flex", flexDirection: "column" }}>
				<label>
					Username
					<input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
				</label>
				<label>
					Password
					<input
						type="password"
						name="password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						required
					/>
				</label>
				<input type="submit" value="Login" />
			</form>
			<button onClick={() => navigate(signupUrl)}>Signup</button>
		</>
	);
}
