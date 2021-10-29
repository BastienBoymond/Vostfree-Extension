
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

async function createResumeButton() {
    let animes = await get_stored_value("anime_series");
    if (animes.length > 0) {
        for (const anime of animes) {
            console.log(anime);
            let details = await requestGetData('http://54.36.183.102:2900/anime/' + anime.anime);
            details = JSON.parse(details);
            const button = document.createElement('button');
            button.innerText = details.title + " Ep" + anime.episodes + "\nEpisodes:" + details.nbepisodes;
            button.className = details.title;
            button.id = anime.anime;
            document.getElementsByClassName('resume-content')[0].appendChild(button);
        }
    }
}

createResumeButton();

window.onclick = async function(event) {
    const target = event.target;
    if (target.className === "goBack" || target.className === "fas fa-arrow-left") {
        window.location.href = '../home/popup.html'
    } else if (target.className !== 'scroll-bar resume-content') {
        const id = target.id;
        window.open(`https://vostfree.tv/${id}-ddl-streaming-1fichier-uptobox.html`);
    }
}