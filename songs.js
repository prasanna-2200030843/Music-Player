// const songs = {
//     Happy: [
//         "Yeh Tune Kya Kiya",
//         "Masakali",
//         "Gallan Goodiyaan",
//         "Luka Chuppi: COCA COLA ",
//         "Awaara - Nee Yadalo Naaku",
//         "Tere Liye"
//     ],
//     Sad: [
//         "Pal Pal",
//         "Channa Mereya",
//         "Agar Tum Saath Ho",
//         "Kabira",
//         "Saheba",
//         "Tujhe Kitna Chahne Lage"
//     ],
//     Rap: [
//         "Lose Yourself",
//         "God's Plan",
//         "Mockingbird",
//         "MIC Drop",
//         "DNA.",
//         "Not Like Us"
//     ],
//     Motivation: [
//         "Best of Me",
//         "Hall of Fame",
//         "Believer",
//         "Eye of the Tiger",
//         "Unstoppable",
//         "Whatever It Takes"
//     ],
//     English: [
//         "Him & I ",
//         "I Think They Call This Love",
//         "Love Me Like You Do",
//         "Shape Of You",
//         "I Wanna Be Yours",
//         "Baby"
//     ],
//     Telugu: [
//         "Yemaaya Chesave - Manasaa",
//         "Adhento Gaani Vunnapaatuga",
//         "Inkem Inkem Inkem Kaavaale",
//         "Samajavaragamana",
//         "Vachindamma",
//         "Emitemitemo"
//     ],
//     Love: [
//         "Tum Hi Ho",
//         "Perfect",
//         "Until I Found You",
//         "Kadalalle",
//         "Heeriye",
//         "Tera Ban Jaunga"
//     ],
//     Mass: [
//         "Darlingey",
//         "Oo Antava Oo Oo Antava",
//         "Ramulo Ramula",
//         "Top Lesi Poddi",
//         "Seeti Maar",
//         "Rakhi Rakhi"
//     ],
//     Party: [
//         "Levitating",
//         "Uptown Funk",
//         "Cheap Thrills",
//         "Abhi Toh Party Shuru Hui Hai",
//         "Badtameez Dil",
//         "On The Floor"
//     ],
//     Night: [
//         "Night Changes",
//         "Dusk Till Dawn",
//         "After Dark",
//         "Die With A Smile",
//         "The Night We Met",
//         "Lovely"
//     ]
// };
// const descriptions = {
//     Happy: "Feel good songs for your mood.",
//     Sad: "Songs for quiet and emotional moments.",
//     Rap: "Rap and hip-hop songs.",
//     Motivation: "Powerful songs to keep you going.",
//     English: "Popular English songs.",
//     Telugu: "Popular Telugu songs.",
//     Love: "Romantic songs for your playlist.",
//     Mass: "High-energy songs to feel the mass vibe.",
//     Party: "Songs to lift the energy.",
//     Night: "Songs for your late-night mood."
// };
// const songsBox = document.getElementById("songsBox");
// const categoryTitle = document.getElementById("categoryTitle");
// const categoryText = document.getElementById("categoryText");
// const songCount = document.getElementById("songCount");
// const audioPlayer = document.getElementById("audioPlayer");
// const searchInput = document.getElementById("searchInput");
// let currentCategory = "Happy";
// let playlist = JSON.parse(localStorage.getItem("playlist")) || [];
// function showSongs(category) {
//     currentCategory = category;
//     categoryTitle.textContent = category + " Songs";
//     categoryText.textContent = descriptions[category];
//     songsBox.innerHTML = "";
//     songCount.textContent = songs[category].length + " Songs";
//     songs[category].forEach(function(song) {
//         createSong(song);
//     });
// }
// function createSong(song) {
//     const songItem = document.createElement("div");
//     songItem.className = "song-item d-flex align-items-center mb-2";
//     songItem.innerHTML = `
//         <button class="play-btn"><i class="bi bi-play-fill"></i></button>
//         <h5>${song}</h5>
//         <span>Loading...</span>
//         <small class="heart-btn"><i class="bi bi-heart"></i></small>
//         <small><i class="bi bi-three-dots"></i></small>
//     `;
//     songsBox.appendChild(songItem);
//     getSong(song, songItem);
// }
// async function getSong(song, songItem) {
//     try {
//         const response = await fetch(
//             `https://itunes.apple.com/search?term=${encodeURIComponent(song)}&entity=song&limit=1`
//         );
//         const data = await response.json();
//         if (data.results.length === 0) {
//             songItem.querySelector("span").textContent = "Song not found";
//             return;
//         }
//         const result = data.results[0];
//         const playButton = songItem.querySelector(".play-btn");
//         const icon = playButton.querySelector("i");
//         let artist = result.artistName.split(",")[0].split("&")[0].trim();
//         songItem.querySelector("span").textContent = artist;
//         playButton.addEventListener("click", function() {
//             playSong(result.previewUrl, icon, song);
//         });
//         const heartButton = songItem.querySelector(".heart-btn");
//         const heart = heartButton.querySelector("i");
//         let alreadyInPlaylist = playlist.some(function(item) {
//             return item.title === song;
//         });
//         if (alreadyInPlaylist) {
//             heart.classList.remove("bi-heart");
//             heart.classList.add("bi-heart-fill");
//         }
//         heartButton.addEventListener("click", function() {
//             let songIndex = playlist.findIndex(function(item) {
//                 return item.title === song;
//             });
//             if (songIndex === -1) {
//                 playlist.push({
//                     title: song,
//                     artist: artist,
//                     audio: result.previewUrl
//                 });
//                 heart.classList.remove("bi-heart");
//                 heart.classList.add("bi-heart-fill");
//             } else {
//                 playlist.splice(songIndex, 1);
//                 heart.classList.remove("bi-heart-fill");
//                 heart.classList.add("bi-heart");
//             }
//             localStorage.setItem("playlist", JSON.stringify(playlist));
//         });
//     } catch (error) {
//         songItem.querySelector("span").textContent = "Unable to load";
//     }
// }
// function playSong(url, icon, songName) {
//     if (!url) {
//         return;
//     }
//     if (audioPlayer.src === url && !audioPlayer.paused) {
//         audioPlayer.pause();
//         icon.classList.remove("bi-pause-fill");
//         icon.classList.add("bi-play-fill");
//         return;
//     }
//     document.querySelectorAll(".play-btn i").forEach(function(item) {
//         item.classList.remove("bi-pause-fill");
//         item.classList.add("bi-play-fill");
//     });
//     audioPlayer.src = url;
//     audioPlayer.play();
//     icon.classList.remove("bi-play-fill");
//     icon.classList.add("bi-pause-fill");
//     let recent = JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
//     recent = recent.filter(function(song) {
//         return song !== songName;
//     });
//     recent.unshift(songName);
//     recent = recent.slice(0, 5);
//     localStorage.setItem("recentlyPlayed", JSON.stringify(recent));
// }
// document.querySelectorAll(".category-btn").forEach(function(button) {
//     button.addEventListener("click", function() {
//         showSongs(button.dataset.category);
//     });
// });
// searchInput.addEventListener("input", function() {
//     const searchValue = searchInput.value.toLowerCase().trim();
//     if (searchValue === "") {
//         showSongs(currentCategory);
//         return;
//     }
//     songsBox.innerHTML = "";
//     let foundSongs = [];
//     let foundCategory = "";
//     for (let category in songs) {
//         const matchingSongs = songs[category].filter(function(song) {
//             return song.toLowerCase().includes(searchValue);
//         });
//         if (matchingSongs.length > 0) {
//             foundCategory = category;
//             matchingSongs.forEach(function(song) {
//                 foundSongs.push(song);
//             });
//         }
//     }
//     if (foundSongs.length > 0) {
//         currentCategory = foundCategory;
//         categoryTitle.textContent = foundCategory + " Songs";
//         categoryText.textContent = descriptions[foundCategory];
//         songCount.textContent = foundSongs.length + " Songs";
//         foundSongs.forEach(function(song) {
//             createSong(song);
//         });
//     } else {
//         categoryTitle.textContent = "No Songs Found";
//         categoryText.textContent = "Try searching another song.";
//         songCount.textContent = "0 Songs";
//     }
// });
// showSongs("Happy");
const songs = {
    Happy: [
        "Yeh Tune Kya Kiya",
        "Masakali",
        "Gallan Goodiyaan",
        "Luka Chuppi: COCA COLA",
        "Awaara - Nee Yadalo Naaku",
        "Tere Liye"
    ],
    Sad: [
        "Pal Pal",
        "Channa Mereya",
        "Agar Tum Saath Ho",
        "Kabira",
        "Saheba",
        "Tujhe Kitna Chahne Lage"
    ],
    Rap: [
        "Lose Yourself",
        "God's Plan",
        "Mockingbird",
        "MIC Drop",
        "DNA.",
        "Not Like Us"
    ],
    Motivation: [
        "Best of Me",
        "Hall of Fame",
        "Believer",
        "Eye of the Tiger",
        "Unstoppable",
        "Whatever It Takes"
    ],
    English: [
        "Him & I",
        "I Think They Call This Love",
        "Love Me Like You Do",
        "Shape Of You",
        "I Wanna Be Yours",
        "Baby"
    ],
    Telugu: [
        "Yemaaya Chesave - Manasaa",
        "Adhento Gaani Vunnapaatuga",
        "Inkem Inkem Inkem Kaavaale",
        "Samajavaragamana",
        "Vachindamma",
        "Emitemitemo"
    ],
    Love: [
        "Tum Hi Ho",
        "Perfect",
        "Until I Found You",
        "Kadalalle",
        "Heeriye",
        "Tera Ban Jaunga"
    ],
    Mass: [
        "Darlingey",
        "Oo Antava Oo Oo Antava",
        "Ramulo Ramula",
        "Top Lesi Poddi",
        "Seeti Maar",
        "Rakhi Rakhi"
    ],
    Party: [
        "Levitating",
        "Uptown Funk",
        "Cheap Thrills",
        "Abhi Toh Party Shuru Hui Hai",
        "Badtameez Dil",
        "On The Floor"
    ],
    Night: [
        "Night Changes",
        "Dusk Till Dawn",
        "After Dark",
        "Die With A Smile",
        "The Night We Met",
        "Lovely"
    ]
};

const descriptions = {
    Happy: "Feel good songs for your mood.",
    Sad: "Songs for quiet and emotional moments.",
    Rap: "Rap and hip-hop songs.",
    Motivation: "Powerful songs to keep you going.",
    English: "Popular English songs.",
    Telugu: "Popular Telugu songs.",
    Love: "Romantic songs for your playlist.",
    Mass: "High-energy songs to feel the mass vibe.",
    Party: "Songs to lift the energy.",
    Night: "Songs for your late-night mood."
};

const songsBox = document.getElementById("songsBox");
const categoryTitle = document.getElementById("categoryTitle");
const categoryText = document.getElementById("categoryText");
const songCount = document.getElementById("songCount");
const audioPlayer = document.getElementById("audioPlayer");
const searchInput = document.getElementById("searchInput");

let currentCategory = "Happy";
let playlist = JSON.parse(localStorage.getItem("playlist")) || [];

function showSongs(category) {
    currentCategory = category;
    categoryTitle.textContent = category + " Songs";
    categoryText.textContent = descriptions[category];
    songsBox.innerHTML = "";
    songCount.textContent = songs[category].length + " Songs";

    songs[category].forEach(function(song) {
        createSong(song);
    });
}

function createSong(song) {
    const songItem = document.createElement("div");

    songItem.className = "song-item d-flex align-items-center gap-2 p-2 rounded-4 mb-2";

    songItem.innerHTML = `
        <button class="play-btn rounded-circle p-2">
            <i class="bi bi-play-fill fs-6"></i>
        </button>
        <h6 class="mb-0 flex-grow-1 text-truncate">${song}</h6>
        <span class="d-none d-sm-block text-truncate"></span>
        <small class="heart-btn">
            <i class="bi bi-heart"></i>
        </small>
        <small>
            <i class="bi bi-three-dots"></i>
        </small>
    `;

    songsBox.appendChild(songItem);
    getSong(song, songItem);
}

async function getSong(song, songItem) {
    try {
        const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(song)}&entity=song&limit=1`);
        const data = await response.json();

        if (data.results.length === 0) {
            songItem.querySelector("span").textContent = "Song not found";
            return;
        }

        const result = data.results[0];
        const playButton = songItem.querySelector(".play-btn");
        const icon = playButton.querySelector("i");

        let artist = result.artistName.split(",")[0].split("&")[0].trim();

        songItem.querySelector("span").textContent = artist;

        playButton.addEventListener("click", function() {
            playSong(result.previewUrl, icon, song);
        });

        const heartButton = songItem.querySelector(".heart-btn");
        const heart = heartButton.querySelector("i");

        let alreadyInPlaylist = playlist.some(function(item) {
            return item.title === song;
        });

        if (alreadyInPlaylist) {
            heart.classList.remove("bi-heart");
            heart.classList.add("bi-heart-fill");
        }

        heartButton.addEventListener("click", function() {
            let songIndex = playlist.findIndex(function(item) {
                return item.title === song;
            });

            if (songIndex === -1) {
                playlist.push({
                    title: song,
                    artist: artist,
                    audio: result.previewUrl
                });

                heart.classList.remove("bi-heart");
                heart.classList.add("bi-heart-fill");
            } else {
                playlist.splice(songIndex, 1);

                heart.classList.remove("bi-heart-fill");
                heart.classList.add("bi-heart");
            }

            localStorage.setItem("playlist", JSON.stringify(playlist));
        });
    } catch (error) {
        songItem.querySelector("span").textContent = "Unable to load";
    }
}

function playSong(url, icon, songName) {
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

    let recent = JSON.parse(localStorage.getItem("recentlyPlayed")) || [];

    recent = recent.filter(function(song) {
        return song !== songName;
    });

    recent.unshift(songName);
    recent = recent.slice(0, 5);

    localStorage.setItem("recentlyPlayed", JSON.stringify(recent));
}

document.querySelectorAll(".category-btn").forEach(function(button) {
    button.addEventListener("click", function() {
        showSongs(button.dataset.category);
    });
});

searchInput.addEventListener("input", function() {
    const searchValue = searchInput.value.toLowerCase().trim();

    if (searchValue === "") {
        showSongs(currentCategory);
        return;
    }

    songsBox.innerHTML = "";

    let foundSongs = [];
    let foundCategory = "";

    for (let category in songs) {
        const matchingSongs = songs[category].filter(function(song) {
            return song.toLowerCase().includes(searchValue);
        });

        if (matchingSongs.length > 0) {
            foundCategory = category;

            matchingSongs.forEach(function(song) {
                foundSongs.push(song);
            });
        }
    }

    if (foundSongs.length > 0) {
        currentCategory = foundCategory;
        categoryTitle.textContent = foundCategory + " Songs";
        categoryText.textContent = descriptions[foundCategory];
        songCount.textContent = foundSongs.length + " Songs";

        foundSongs.forEach(function(song) {
            createSong(song);
        });
    } else {
        categoryTitle.textContent = "No Songs Found";
        categoryText.textContent = "Try searching another song.";
        songCount.textContent = "0 Songs";
    }
});

showSongs("Happy");