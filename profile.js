// const profileName = document.getElementById("profileName");
// const profileDetails = document.getElementById("profileDetails");
// const loginButton = document.getElementById("loginButton");
// const logoutButton = document.getElementById("logoutButton");
// const playlistCount = document.getElementById("playlistCount");
// const recentSongs = document.getElementById("recentSongs");
// const profileForm = document.getElementById("profileForm");
// const nameInput = document.getElementById("nameInput");
// const emailInput = document.getElementById("emailInput");
// const mobileInput = document.getElementById("mobileInput");
// function showProfile() {
//     const name = localStorage.getItem("profileName");
//     const email = localStorage.getItem("profileEmail");
//     const mobile = localStorage.getItem("profileMobile");
//     if (name && email && mobile) {
//         profileName.textContent = name;
//         profileDetails.textContent = email + " | " + mobile;
//         loginButton.classList.add("d-none");
//         logoutButton.classList.remove("d-none");
//     } else {
//         profileName.textContent = "My Profile";
//         profileDetails.textContent = "Login to add your details";
//         loginButton.classList.remove("d-none");
//         logoutButton.classList.add("d-none");
//     }
// }
// function showPlaylistCount() {
//     const playlist = JSON.parse(localStorage.getItem("playlist")) || [];
//     playlistCount.textContent = playlist.length + (playlist.length === 1 ? " song" : " songs");
// }
// function showRecentlyPlayed() {
//     const recent = JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
//     recentSongs.innerHTML = "";
//     if (recent.length === 0) {
//         recentSongs.innerHTML = "<span>0 songs</span>";
//         return;
//     }
//     recent.forEach(function(song) {
//         const songName = document.createElement("div");
//         songName.className = "mb-1";
//         songName.textContent = song;
//         recentSongs.appendChild(songName);
//     });
// }
// profileForm.addEventListener("submit", function(event) {
//     event.preventDefault();
//     localStorage.setItem("profileName", nameInput.value);
//     localStorage.setItem("profileEmail", emailInput.value);
//     localStorage.setItem("profileMobile", mobileInput.value);
//     showProfile();
//     const modal = bootstrap.Modal.getInstance(document.getElementById("profileModal"));
//     modal.hide();
//     profileForm.reset();
// });
// logoutButton.addEventListener("click", function() {
//     localStorage.removeItem("profileName");
//     localStorage.removeItem("profileEmail");
//     localStorage.removeItem("profileMobile");
//     localStorage.removeItem("playlist");
//     localStorage.removeItem("recentlyPlayed");
//     showProfile();
//     showPlaylistCount();
//     showRecentlyPlayed();
// });
// showProfile();
// showPlaylistCount();
// showRecentlyPlayed();
let profileForm = document.getElementById("profileForm");
let profileName = document.getElementById("profileName");
let profileDetails = document.getElementById("profileDetails");
let loginButton = document.getElementById("loginButton");
let logoutButton = document.getElementById("logoutButton");
let playlistCount = document.getElementById("playlistCount");
let recentSongs = document.getElementById("recentSongs");
let savedProfile = JSON.parse(localStorage.getItem("profile"));
let playlist = JSON.parse(localStorage.getItem("playlist")) || [];
let recent = JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
function showProfile() {
    if (savedProfile) {
        profileName.textContent = savedProfile.name;
        profileDetails.textContent = savedProfile.email + " | " + savedProfile.mobile;
        loginButton.classList.add("d-none");
        logoutButton.classList.remove("d-none");
    }
    playlistCount.textContent = playlist.length + " songs";
    recentSongs.innerHTML = "";
    if (recent.length === 0) {
        recentSongs.textContent = "No songs played yet.";
        return;
    }
    recent.forEach(function(song) {
        let item = document.createElement("div");
        item.className = "mb-1 text-truncate";
        item.textContent = song;
        recentSongs.appendChild(item);
    });
}
profileForm.addEventListener("submit",function(event) {
    event.preventDefault();
    let profile = {
        name: document.getElementById("nameInput").value,
        email: document.getElementById("emailInput").value,
        mobile: document.getElementById("mobileInput").value
    };
    localStorage.setItem("profile",JSON.stringify(profile));
    savedProfile = profile;
    bootstrap.Modal.getInstance(document.getElementById("profileModal")).hide();
    showProfile();
});
logoutButton.addEventListener("click",function() {
    localStorage.removeItem("profile");
    savedProfile = null;
    profileName.textContent = "My Profile";
    profileDetails.textContent = "Login to add your details";
    loginButton.classList.remove("d-none");
    logoutButton.classList.add("d-none");
});
showProfile();