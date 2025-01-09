import { ShopHeader } from "./ShopHeader";

export function LoginPage() {
    return (
        <>
            <ShopHeader />
            <div className="w-full max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-center text-3xl font-bold mb-6">Log in or Sign up</h1>
                <input
                    className="w-full text-lg p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Username"
                />
                <input
                    className="w-full text-lg p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="password"
                    placeholder="Password"
                />
                <button
                    className="w-full text-xl text-white py-3 mb-4 bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Login
                </button>
                <button
                    className="w-full text-xl text-white py-3 bg-green-500 rounded-lg hover:bg-green-600 transition duration-300"
                >
                    Signup
                </button>
            </div>
        </>
    );
}