import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Signup = () => {
	const userNameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();

	const signup = async () => {
    const username = userNameRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();

    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

    await axios.post(`${BACKEND_URL}/api/v1/signup`, { username, password });

    alert("You have signed up");
    navigate("/");
  };

	return (
		<div className="h-screen w-screen bg-[#f3f4f6] flex flex-col justify-center items-center p-4 select-none">
			<div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 w-80 max-w-sm flex flex-col gap-4">
				<div className="flex flex-col gap-3">
					<Input placeholder="username" ref={userNameRef} />
					<Input placeholder="password" type="password" ref={passwordRef} />
				</div>
				<Button
					onClick={signup}
					varient="primary"
					text="Signup"
					fullWidth={true}
				/>
				<div className="text-center text-xs text-gray-500 pt-1">
					Already have an account?{" "}
					<Link to="/signin" className="text-[#5046e4] font-medium hover:underline">
						Sign in
					</Link>
				</div>
			</div>
		</div>
	);
};
