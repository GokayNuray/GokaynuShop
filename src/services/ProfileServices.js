export const API = "https://nameless.gokaynu.workers.dev/"

export function saveLogin(name, password) {
    const login = {
        name: name,
        password: password,
    }
    localStorage.setItem("login", JSON.stringify(login));
}

export function getLogin() {
    return JSON.parse(localStorage.getItem("login"));
}

export function saveProfile(profile) {
    sessionStorage.setItem("profile", JSON.stringify(profile));
}

export function getProfile(setProfile) {
    let profile = JSON.parse(sessionStorage.getItem("profile"));
    if (!profile) {
        const login = getLogin();
        if (login) {
            setProfile("wait");
            saveProfile("wait");
            fetchProfile(login, (response) => {
                if (response.error) {
                    console.error(response.error);
                    alert(response.error);
                    logOut();
                    setProfile(null);
                } else {
                    saveProfile(response);
                    setProfile(response);
                }
            });
        } else {
            setProfile(null);
        }
    } else {
        setProfile(profile);
    }
}

export function logOut() {
    sessionStorage.removeItem("profile");
    localStorage.removeItem("login");
    window.location.reload();
}

const fixImagePaths = (profile) => {
    profile.profilePic = API + "avatars/" + profile.profilePic;
}

export function createProfile(login, callback) {
    fetch(API + "create-user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
    })
        .then(response => response.json())
        .then(data => {
            fixImagePaths(data);
            callback(data);
        })
}

export function fetchProfile(login, callback) {
    fetch(API + "login-user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
    })
        .then(response => response.json())
        .then(data => {
            fixImagePaths(data);
            callback(data);
        });
}

export function changeName(id, newName, callback) {
    fetch(API + "rename-user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id: id, newName: newName}),
    })
        .then(response => response.json())
        .then(data => {
            callback(data);
        });
}

export function changeAvatar(id, avatar, callback) {
    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("id", id);

    fetch(API + "update-avatar", {
        method: "POST",
        headers: {
            'Accept': '*/*',
        },
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            callback(data);
        });
}