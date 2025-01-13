import {useState} from "react";
import {depositMoney} from "../services/ProfileServices";

export function WalletPage({profile, setProfile} ) {
    const [amount, setAmount] = useState("");
    const [depositStatus, setDepositStatus] = useState("Deposit");

    const handleChange = (e) => {
        if (!isNaN(e.target.value) || e.target.value === "-") {
            setAmount(e.target.value);
        }
    }

    const handleDeposit = () => {
        setDepositStatus("Depositing...");
        depositMoney(profile.id, amount, (data) => {
            if (data.error) {
                alert(data.error);
            } else {
                profile.balance = data.balance;
                setProfile({...profile});
                setDepositStatus("Deposit");
                setAmount("");
            }
        });
    }

    return (
        <div className="max-w-lg m-auto mt-10 p-6 rounded-lg shadow-lg bg-white">
            <p className="text-2xl font-bold text-gray-700 mb-4">Balance: ${profile.balance}</p>
                <div className="flex space-x-2">
                    <input onChange={handleChange} value={amount} placeholder="Amount" className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 no-spinner"/>
                    <button disabled={depositStatus !== "Deposit"} onClick={handleDeposit} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800 transition duration-300">
                        {depositStatus}
                    </button>
                </div>
        </div>
    )
}