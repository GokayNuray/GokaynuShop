import {getBalance, getName, getProfilePic} from "../services/ProfileServices";

export function Profile() {
    return (
        <div className="relative inline-block size-16 group">
            <img src={getProfilePic()} alt="pfp"/>
            <div className="absolute left-0 bg-white opacity-0 h-0 overflow-hidden group-hover:h-40 group-hover:opacity-100 w-32 -translate-x-16 transition duration-500 flex-col">
                <p className="text-center h-1/5">{getName()}</p>
                <button className="bg-yellow-200 font-bold w-full h-2/5">Balance: {getBalance()}</button>
                <button className="bg-red-500 font-bold w-full h-2/5">Logout</button>
            </div>
        </div>
    )
}