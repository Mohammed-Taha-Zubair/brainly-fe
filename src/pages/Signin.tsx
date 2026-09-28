import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Signin = () => {
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const signin = async() => {
    const username = userNameRef.current?.value.trim();
    console.log(userNameRef.current);
    console.log(userNameRef.current?.value);
    const password = passwordRef.current?.value.trim();

    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

    const resposne = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
      username,password
    })

    const jwt  = resposne.data.token;
    localStorage.setItem("brainly_user", jwt)
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
          onClick={signin}
          varient="primary"
          text="Signin"
          fullWidth={true}
        />

        <div className="text-center text-xs text-gray-500 pt-1">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#5046e4] font-medium hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};