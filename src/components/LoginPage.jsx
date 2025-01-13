import {createProfile, fetchProfile, saveLogin, saveProfile} from "../services/ProfileServices";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export function LoginPage({setProfile}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (!response || response === "wait") return;
        if (response.name) {
            saveLogin({name : username, password: password});
            setProfile(response);
            saveProfile(response);
            navigate("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response]);

    const login = () => {
        if (username.length < 3 || password.length < 3) {
            setResponse({error :"Username and password must be at least 3 characters long"});
            return;
        }
        const login = {
            name: username,
            password: password,
        }
        setResponse("wait");
        fetchProfile(login, setResponse)
    }

    const signUp = () => {
        if (username.length < 3 || password.length < 3) {
            setResponse({error :"Username and password must be at least 3 characters long"});
            return;
        }
        const login = {
            name: username,
            password: password,
        }
        setResponse("wait");
        createProfile(login, setResponse)
    }

    return (
        <>
            <div className="w-full max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-center text-3xl font-bold mb-6">Log in or Sign up</h1>
                <input disabled={response === "wait"}
                    className={"w-full text-lg p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" + (response.error && " border-red-500")}
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <div className="flex align-middle">
                <input disabled={response === "wait"}
                    className={"w-full text-lg p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" + (response.error && " border-red-500")}
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                    <div className="m-1 size-12 text-2xl p-2 text-center bg-gray-300 rounded-full"
                    title="passwords are stored in plain text for simplicity. Please do not use passwords you use anywhere else">?</div>
                </div>
                {response.error && <p className="text-red-500 text-center">{response.error}</p>}
                <button onClick={login} disabled={response === "wait"}
                        className="w-full text-xl text-white py-3 mb-4 bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Login
                </button>
                <button onClick={signUp} disabled={response === "wait"}
                    className="w-full text-xl text-white py-3 bg-green-500 rounded-lg hover:bg-green-600 transition duration-300"
                >
                    Sign up
                </button>
            </div>
        </>
    );
}
