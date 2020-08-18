document.getElementById('submit-song').addEventListener('click', () => {
    let songName = document.getElementById('song').value;
    fetch(`https://api.lyrics.ovh/suggest/${songName}`)
        .then(res => res.json())
        .then(data => {
            let song = data.data;
            let songID = song.map(song => song.id);
            let songTitle = song.map(song => song.title);
            let songArtist = song.map(song => song.artist.name);
            let albumName = song.map(song => song.album.title);
            let html = ``;
            for (let index = 0; index < 10; index++) {
                html += `<div class="single-result row align-items-center my-3 p-3">
                            <div class="col-md-9">
                                <h3 class="lyrics-name">${songTitle[index]}</h3>
                                <h6 class="author lead"> Singer: <span>${songArtist[index]}</span></h6>
                                <p class="author lead">Album by <span>${albumName[index]}</span></p>
                            </div>
                            <div class="col-md-3 text-md-right text-center">
                                <button id="${songID[index]}" class="btn btn-success">Get Lyrics</button>
                            </div>
                        </div>`;

                // Lyrics part start Here
                document.getElementById('result').addEventListener('click', element => {
                    let clickId = element.target.getAttribute('id');
                    if (songID[index] == clickId) {
                        fetch(`https://api.lyrics.ovh/v1/${songArtist[index]}/${songTitle[index]}`)
                            .then(res => {
                                if (res.ok) {
                                    return res.json();
                                } else {
                                    throw new Error('Something went wrong');
                                }
                            })
                            .then(data => {
                                let html = `<div class="single-lyrics text-center">
                                                <h2 class="text-success mb-4">${songTitle[index]} - ${songArtist[index]}</h2>
                                                <pre class="lyric text-white">${data.lyrics}</pre>
                                            </div>`
                                document.getElementById('result').innerHTML = html;
                            })
                            .catch((error) => {
                                let html = `<div class="single-lyrics text-center">
                                                <h2 class="text-success mb-4">Sorry, This Lyrics is missing.</h2>
                                            </div>`;
                                document.getElementById('result').innerHTML = html;
                            })
                    }
                })// Lyrics part end here.
            }
            document.getElementById('result').innerHTML = html;
        });
});