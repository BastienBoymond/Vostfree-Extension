
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

function getCookies(domain, name) {
    return new Promise((resolve) => {
        chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
            resolve(cookie);
        });
    });
}

async function createResumeButton() {
    let data = await getCookies("https://vostfree.tv/", "anime_series");
    data = decodeURIComponent(data.value);
    let animes = data.split("||");
    animes.shift();
    if (animes.length > 0) {
        for (const anime of animes) { // 0: anime 1: episode
            console.log(anime);
            let ep = anime.split("|");
            console.log(ep);
            let details = await requestGetData('http://54.36.183.102:2900/anime/' + ep[0]);
            details = JSON.parse(details);
            const button = document.createElement('button');
            button.innerText = details.title + " Ep" + ep[1] + "\nEpisodes:" + details.nbepisodes;
            button.className = details.title;
            button.id = ep[0];
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