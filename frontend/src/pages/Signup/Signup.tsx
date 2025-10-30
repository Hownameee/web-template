import { create, fromBinary, toBinary } from "@bufbuild/protobuf";
import { useState, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { SignupRequestSchema, type SignupRequest } from "src/lib/gen/auth_pb";
import { ResponseSchema, Status } from "src/lib/gen/response_pb";

export default function Signup() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const redirectTo = searchParams.get("redirect") || "/";
	const loginUrl = redirectTo && redirectTo !== "/" ? `/login?redirect=${encodeURIComponent(redirectTo)}` : "/login";

	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [password2, setPassword2] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (password != password2) {
			setErrorMessage("Password not match");
			return;
		}
		const signup: SignupRequest = create(SignupRequestSchema, { username: username, password: password });
		const bytes = toBinary(SignupRequestSchema, signup);

		try {
			const res = await fetch("/api/signup", { method: "POST", headers: { "Content-Type": "application/x-protobuf" }, body: bytes });

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
				<label>
					Confirm Password
					<input
						type="password"
						name="password2"
						value={password2}
						onChange={(e) => {
							setPassword2(e.target.value);
						}}
						required
					/>
				</label>
				<input type="submit" value="Signup" />
			</form>
			<button onClick={() => navigate(loginUrl)}>Login</button>
		</>
	);
}
