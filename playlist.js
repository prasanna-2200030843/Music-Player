// let playlist = JSON.parse(localStorage.getItem("playlist")) || [];
// let playlistBox = document.getElementById("playlist-box");
// let emptyPlaylist = document.getElementById("empty-playlist");
// let songCount = document.getElementById("song-count");
// let playAll = document.getElementById("play-all");
// function showPlaylist() {
//     playlistBox.innerHTML = "";
//     songCount.textContent = playlist.length + (playlist.length === 1 ? " song" : " songs");
//     if (playlist.length === 0) {
//         emptyPlaylist.classList.remove("d-none");
//         return;
//     }
//     emptyPlaylist.classList.add("d-none");
//     playlist.forEach(function(song, index) {
//         let songItem = document.createElement("div");
//         songItem.className = "song-item d-flex align-items-center mb-2 px-3";
//         songItem.innerHTML = `
//             <button class="play-btn play-song">
//                 <i class="bi bi-play-fill"></i>
//             </button>
//             <div class="flex-grow-1">
//                 <h5 class="mb-0">${song.title}</h5>
//                 <span>${song.artist}</span>
//             </div>
//             <small class="me-3">
//                 <i class="bi bi-heart-fill"></i>
//             </small>
//             <button class="btn btn-link text-decoration-none text-dark remove-song" data-index="${index}">
//                 <i class="bi bi-trash3"></i>
//             </button>
//         `;
//         playlistBox.appendChild(songItem);
//         let playButton = songItem.querySelector(".play-song");
//         playButton.addEventListener("click", function() {
//             playSong(song, playButton);
//         });
//     });
//     document.querySelectorAll(".remove-song").forEach(function(button) {
//         button.addEventListener("click", function() {
//             let index = button.dataset.index;
//             playlist.splice(index, 1);
//             localStorage.setItem("playlist", JSON.stringify(playlist));
//             showPlaylist();
//         });
//     });
// }
// function playSong(song, button) {
//     if (!song.audio) {
//         return;
//     }
//     let audio = new Audio(song.audio);
//     audio.play();
//     button.innerHTML = `<i class="bi bi-pause-fill"></i>`;
//     audio.addEventListener("ended", function() {
//         button.innerHTML = `<i class="bi bi-play-fill"></i>`;
//     });
//     button.onclick = function() {
//         if (audio.paused) {
//             audio.play();
//             button.innerHTML = `<i class="bi bi-pause-fill"></i>`;
//         } else {
//             audio.pause();
//             button.innerHTML = `<i class="bi bi-play-fill"></i>`;
//         }
//     };
// }
// playAll.addEventListener("click", function() {
//     if (playlist.length === 0) {
//         return;
//     }
//     playSong(playlist[0], playAll);
// });
// showPlaylist();
let playlist = JSON.parse(localStorage.getItem("playlist")) || [];
let audioPlayer = document.getElementById("audioPlayer");
let playlistBox = document.getElementById("playlist-box");
let emptyPlaylist = document.getElementById("empty-playlist");
let songCount = document.getElementById("song-count");
function showPlaylist() {
    playlistBox.innerHTML = "";
    songCount.textContent = playlist.length + " songs";
    if (playlist.length === 0) {
        emptyPlaylist.classList.remove("d-none");
        return;
    }
    emptyPlaylist.classList.add("d-none");
    playlist.forEach(function(song,index) {
        let songItem = document.createElement("div");
        songItem.className = "song-item d-flex align-items-center gap-2 rounded-4 p-2 mb-2";
        songItem.innerHTML = `
            <button class="play-btn rounded-circle p-2">
                <i class="bi bi-play-fill fs-5"></i>
            </button>
            <div class="flex-grow-1 overflow-hidden">
                <h5 class="mb-1 text-truncate">${song.title}</h5>
                <span class="d-block text-truncate">${song.artist}</span>
            </div>
            <button class="btn p-1 text-dark heart-button">
                <i class="bi bi-heart-fill"></i>
            </button>
            <button class="btn p-1 text-dark delete-button">
                <i class="bi bi-trash"></i>
            </button>
        `;
        playlistBox.appendChild(songItem);
        let playButton = songItem.querySelector(".play-btn");
        let icon = playButton.querySelector("i");
        playButton.addEventListener("click",function() {
            playSong(song.audio,icon);
        });
        songItem.querySelector(".delete-button").addEventListener("click",function() {
            playlist.splice(index,1);
            localStorage.setItem("playlist",JSON.stringify(playlist));
            showPlaylist();
        });
    });
}
function playSong(url,icon) {
    if (!url) {
        return;
    }
    if (audioPlayer.src === url && !audioPlayer.paused) {
        audioPlayer.pause();
        icon.classList.remove("bi-pause-fill");
        icon.classList.add("bi-play-fill");
        return;
    }
    document.querySelectorAll(".play-btn i").forEach(function(item) {
        item.classList.remove("bi-pause-fill");
        item.classList.add("bi-play-fill");
    });
    audioPlayer.src = url;
    audioPlayer.play();
    icon.classList.remove("bi-play-fill");
    icon.classList.add("bi-pause-fill");
}
document.getElementById("play-all").addEventListener("click",function() {
    if (playlist.length > 0) {
        playSong(playlist[0].audio,this.querySelector("i"));
    }
});
showPlaylist();