import {API, changeAvatar, changeName, getLogin, logOut, saveLogin, saveProfile} from "../services/ProfileServices";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export function Profile({profile}) {
    const [edit, setEdit] = useState(false);
    const [uploadAvatar, setUploadAvatar] = useState(false);
    const [newName, setNewName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState("");
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
        if (profile.id === parseInt(data.id)) {
            profile.profilePic = API + "avatars/" + data.id;
            saveProfile(profile);
            alert("Avatar changed successfully. The changes may take a minute to show up.");
            window.location.reload();
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
    }

    const handleConfirmUpload = () => {
        if (selectedFile) {
            changeAvatar(profile.id, selectedFile, avatarChangeCallback);
            setUploadAvatar(false);
            setSelectedFile(null);
            setPreview("");
        }
    }

    const handleCancelUpload = () => {
        setUploadAvatar(false);
        setSelectedFile(null);
        setPreview("");
    }

    return (
        <div className="relative inline-block size-16 group rounded">
            <img className={"rounded-full" + (edit ? " animate-pulse cursor-pointer" : "")} src={profile.profilePic}
                 onClick={handleAvatarClick}
                 alt="pfp"/>
            <div
                className="absolute left-0 bg-white opacity-0 h-0 overflow-hidden group-hover:h-48 group-hover:opacity-100 w-32 -translate-x-16 transition duration-500 flex flex-col items-center shadow-lg border border-gray-300 rounded-lg p-2 space-y-1">
                <input disabled={!edit} className={"text-center h-1/5 w-full p-1 rounded" + (edit && " border border-gray-300")} value={edit ? newName : profile.name}
                       onChange={(e) => setNewName(e.target.value)}/>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded w-full"
                        onClick={toggleEdit}>{edit ? "Stop editing" : "Edit profile"}</button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded w-full">Balance: {profile.balance}</button>
                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded w-full" onClick={() => navigate("/sell")}>Sell Items</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded w-full" onClick={logOut}>Logout</button>
            </div>
            {uploadAvatar && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg text-center">
                        <input type="file" id="fileInput" className="hidden" onChange={handleFileChange}/>
                        <label htmlFor="fileInput" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                            Choose File
                        </label>
                        {preview && (
                            <div className="mt-4">
                                <img src={preview} alt="Preview" className="mx-auto mb-4"/>
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleConfirmUpload}>
                                    Confirm
                                </button>
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleCancelUpload}>
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}