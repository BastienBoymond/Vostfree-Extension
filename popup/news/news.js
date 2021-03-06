
async function requestGetData(url){
    try {
        const res = await fetch(url, {
            method: 'GET',
            credentials: 'include',
        });
        return(res.text());
    } catch (e) {
        return (e);
    }
};

function get_stored_value(key) {
    return new Promise((resolve) => {
        chrome.storage.sync.get(key, function(value) {
            resolve(value[key]);
        });
    });
}

async function createNewsButton() {
    let animes = await get_stored_value("anime_series");
    if (animes.length > 0) {
        for (const anime of animes) {
            let details = await requestGetData('http://54.36.183.102:2900/anime/' + anime.anime);
            details = JSON.parse(details);
            console.log(details);
            if (anime.episodes < details.nbepisodes) {
                const button = document.createElement('button');
                button.innerText = details.title + " Ep" + anime.episodes + "\nEpisodes:" + details.nbepisodes;
                button.className = details.title;
                button.id = anime.anime;
                document.getElementsByClassName('news-content')[0].appendChild(button);
            }
        }
    }
}

createNewsButton();

window.onclick = async function(event) {
    const target = event.target;
    if (target.className === "goBack" || target.className === "fas fa-arrow-left") {
        window.location.href = '../home/popup.html'
    } else if (target.className !== 'scroll-bar resume-content' && target.id) {
        const id = target.id;
        window.open(`https://vostfree.tv/${id}-ddl-streaming-1fichier-uptobox.html`);
    }
}