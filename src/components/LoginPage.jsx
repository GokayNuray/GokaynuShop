import {ShopHeader} from "./ShopHeader";
import {fetchProfile} from "../services/ProfileServices";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

export function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const login = () => {
        if (username.length < 3 || password.length < 3) {
            setError("Username and password must be at least 3 characters long");
            return;
        }
        fetchProfile();
        navigate("/");
    }

    return (
        <>
            <ShopHeader/>
            <div className="w-full max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-center text-3xl font-bold mb-6">Log in or Sign up</h1>
                <input
                    className={"w-full text-lg p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" + (error && " border-red-500")}
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className={"w-full text-lg p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" + (error && " border-red-500")}
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-red-500 text-center">{error}</p>}
                <button onClick={login}
                        className="w-full text-xl text-white py-3 mb-4 bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Login
                </button>
                <button
                    className="w-full text-xl text-white py-3 bg-green-500 rounded-lg hover:bg-green-600 transition duration-300"
                >
                    Sign up
                </button>
            </div>
        </>
    );
}