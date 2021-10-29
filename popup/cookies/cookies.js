let cookiesSaved;

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

function getCookies(domain, name) {
    return new Promise((resolve) => {
        chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
            resolve(cookie);
        });
    });
}

function parsingArrayIntoObject(array, key) {
    let result = array.map(anime => {
        let ep = anime.split(key);
        return {episodes: ep[1], anime: ep[0]};
    });
    return result;
}

async function saveCookies() {
    let dataStore = await get_stored_value('anime_series');
    if (dataStore == undefined) {
        let array = parsingArrayIntoObject(cookiesSaved, "|");
        store_value('anime_series', array);
    } else {
        let array = parsingArrayIntoObject(cookiesSaved, "|");
        dataStore = array.map(anime => {
            data = dataStore.find(function(e) { return e.anime === anime.anime;});
            if (data) {
                data.episodes = anime.episodes;
                return anime;
            } else {
                return anime;
            }
        });
        store_value('anime_series', dataStore);
    }
}

async function ResumeCookies() {
    let data = await getCookies("https://vostfree.tv/", "anime_series");
    data = decodeURIComponent(data.value);
    let animes = data.split("||");
    animes.shift();
    cookiesSaved = animes;
    if (animes.length > 0) {
        for (const anime of animes) { // 0: anime 1: episode
            let ep = anime.split("|");
            let details = await requestGetData('http://54.36.183.102:2900/anime/' + ep[0]);
            details = JSON.parse(details);
            const a = document.createElement('a');
            a.innerText = details.title;
            a.className = details.title;
            a.id = ep[0];
            document.getElementsByClassName('cookies-content')[0].appendChild(a);
            document.getElementsByClassName('cookies-content')[0].appendChild(document.createElement('br'));
        }
    } else {
        document.getElementsByClassName('cookies-content')[0] += "<a>No cookies Save</a>"
    }
}

ResumeCookies();

window.onclick = async function(event) {
    const target = event.target;
    console.log(target.className);
    if (target.className === "goBack" || target.className === "fas fa-arrow-left") {
        window.location.href = '../home/popup.html'
    } else if (target.className === "green import-cookies") {
        saveCookies();
    }
}