let animes;

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

function store_value(key, value)
{
    chrome.storage.sync.set({
        [key]: value,
    })
}

async function createButtonDeletes() {
    animes = await get_stored_value("anime_series");
    if (animes.length > 0) {
        for (const anime of animes) {
            let details = await requestGetData('http://54.36.183.102:2900/anime/' + anime.anime);
            details = JSON.parse(details);
            const button = document.createElement('button');
            button.innerText = details.title + " Ep" + anime.episodes + "\nEpisodes:" + details.nbepisodes;
            button.className = details.title;
            button.id = anime.anime;
            document.getElementsByClassName('delete-content')[0].appendChild(button);
        }
    }
}

createButtonDeletes();

window.onclick = async function(event) {
    const target = event.target;
    if (target.className === "goBack" || target.className === "fas fa-arrow-left") {
        window.location.href = '../home/popup.html'
    } else if (animes && target.className !== 'scroll-bar delete-content' && target.className !== 'goBack' && target.className !== 'fas fa-arrow-left') {
        const anime = target.id;
        const anime_series = await get_stored_value("anime_series");
        const index = anime_series.findIndex(anime_series => anime_series.anime === anime);
        anime_series.splice(index, 1);
        store_value("anime_series", anime_series);
        document.getElementsByClassName('delete-content')[0].removeChild(target);
    }
}