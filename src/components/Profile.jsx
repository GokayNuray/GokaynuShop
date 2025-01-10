import {changeName, getLogin, logOut, saveLogin, saveProfile} from "../services/ProfileServices";
import {useState} from "react";

export function Profile({profile}) {
    const [edit, setEdit] = useState(false);
    const [newName, setNewName] = useState("");

    const toggleEdit = () => {
        if (edit) {
            window.confirm(`Are you sure you want to change your name to ${newName}?`) && changeName(profile.id, newName, (data) => {
                if (data.error) {
                    alert(data.error);
                } else {
                    profile.name = newName;
                    saveProfile(profile);
                    const login = getLogin();
                    login.name = newName;
                    saveLogin(login);
                    window.location.reload();
                }
            });
            setNewName("");
            setEdit(false);
        } else {
            setEdit(true);
        }
    }

    return (
        <div className="relative inline-block size-16 group rounded">
            <img className={"rounded-full" + (edit ? " animate-pulse cursor-pointer" : "")} src={profile.profilePic} alt="pfp"/>
            <div
                className="absolute left-0 bg-white opacity-0 h-0 overflow-hidden group-hover:h-80 group-hover:opacity-100 w-32 -translate-x-16 transition duration-500 flex-col">
                <input disabled={!edit} className="text-left h-1/5" value={edit ? newName : profile.name} onChange={(e) => setNewName(e.target.value)}/>
                <button className="bg-black text-white font-bold w-full h-1/5"  onClick={toggleEdit}>{edit ? "Stop editing" : "Edit profile"}</button>
                <button className="bg-yellow-200 font-bold w-full h-1/5">Balance: {profile.balance}</button>
                <button className="bg-red-500 font-bold w-full h-1/5" onClick={logOut}>Logout</button>
            </div>
        </div>
    )
}