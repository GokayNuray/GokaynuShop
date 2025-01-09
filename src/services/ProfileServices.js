export function fetchProfile() {
    console.log("Fetching profile");
    let profile = {
        name: "John Doe",
        balance: 1,
        cart: 3,
        profilePic: "https://www.w3schools.com/howto/img_avatar.png"
    };
    sessionStorage.setItem("profile", JSON.stringify(profile));
}

export function getProfile() {
    return JSON.parse(sessionStorage.getItem("profile"));
}