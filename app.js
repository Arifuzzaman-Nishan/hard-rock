
const getId = (id) => {
    return document.getElementById(id);
}


const getDataFromApi = (url) => {
    fetch(url)
        .then(res => res.json())
        .then(data => songInformationDisplay(data.data))
        .catch(error => {
            getId("lyrics-text").innerText = "sorry something wrong try again later";
        })

}


const searchSong = () => {
    getId("search-button").addEventListener("click", () => {
        getId("lyrics-text").innerText = "";

        const searchText = getId("input-text").value;
        const url = `https://api.lyrics.ovh/suggest/${searchText}`;

        if (searchText === '') {
            getId("song-container").innerHTML = "";
            getId("input-text").value = "";
            getId("lyrics-text").innerText = "sorry please enter a song name";
            getId("lyrics-text").style.color = "tomato";
        }
        else {
            getId("input-text").value = "";
            getDataFromApi(url);
        }

    })
}

searchSong();


const songInformationDisplay = (songs) => {
    const songContainer = getId("song-container");
    console.log(songs);
    songContainer.innerHTML = "";

    songs.forEach(song => {
        const songDiv = document.createElement("div");

        songDiv.className = "single-result row align-items-center my-3 p-3";

        const songInfo = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
               <source src="${song.preview}">
           </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick = "getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;
        songDiv.innerHTML = songInfo;
        songContainer.appendChild(songDiv);
    });
}

const getLyrics = (artistName, title) => {
    const url = `https://api.lyrics.ovh/v1/${artistName}/${title}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const lyricsText = getId("lyrics-text");
            lyricsText.innerText = data.lyrics;
        });
}