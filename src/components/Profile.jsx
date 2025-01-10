import {API, changeAvatar, changeName, getLogin, logOut, saveLogin, saveProfile} from "../services/ProfileServices";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export function Profile({profile}) {
    const [edit, setEdit] = useState(false);
    const [uploadAvatar, setUploadAvatar] = useState(false);
    const [newName, setNewName] = useState("");
    const navigate = useNavigate();

    const handleAvatarClick = () => {
        if (!edit) return;
        setUploadAvatar(true);
    }

    const toggleEdit = () => {
        if (edit) {
            if (newName) {
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
            }
            setEdit(false);
        } else {
            setEdit(true);
        }
    }

    const avatarChangeCallback = (data) => {
        console.log(data);
        if (profile.id === parseInt(data.id)) {
            profile.profilePic = API + "avatars/" + data.id;
            saveProfile(profile);
            alert("Avatar changed successfully. The changes may take a minute to show up.");
            window.location.reload();
        }
    }

    return (
        <div className="relative inline-block size-16 group rounded">
            <img className={"rounded-full" + (edit ? " animate-pulse cursor-pointer" : "")} src={profile.profilePic}
                 onClick={handleAvatarClick}
                 alt="pfp"/>
            <div
                className="absolute left-0 bg-white opacity-0 h-0 overflow-hidden group-hover:h-80 group-hover:opacity-100 w-32 -translate-x-16 transition duration-500 flex-col">
                <input disabled={!edit} className="text-left h-1/5" value={edit ? newName : profile.name}
                       onChange={(e) => setNewName(e.target.value)}/>
                <button className="bg-black text-white font-bold w-full h-1/5"
                        onClick={toggleEdit}>{edit ? "Stop editing" : "Edit profile"}</button>
                <button className="bg-orange-200 font-bold w-full h-1/5">Balance: {profile.balance}</button>
                <button className="bg-yellow-200 font-bold w-full h-1/5" onClick={() => navigate("/sell")}>Sell Items</button>
                <button className="bg-red-500 font-bold w-full h-1/5" onClick={logOut}>Logout</button>
            </div>
            {uploadAvatar && <input type="file" className="fixed top-1/2 left-1/2 size-1/3" onChange={(e) => {
                changeAvatar(profile.id, e.target.files[0], avatarChangeCallback);
            }}/>
            }
        </div>
    )
}