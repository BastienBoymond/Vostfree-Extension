async function requestGet(url){
    let data;
    try {
        const res = await fetch(url, {
            method: 'GET',
            credentials: 'include',
        });
        if (res.status === 200) {
            return true
        } else {
            return false
        }
    } catch (e) {
        return false
    }
};

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

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log(msg);
    doSomethingWith(msg).then(sendResponse);
    return true;
  });
  
async function doSomethingWith(msg) {
    let data = await requestGet(msg.url);
    return data;
}

function createMessage(newsPage) {
    let message;
    if (newsPage.length === 1) {
        message = `Le manga : ${newsPage[0]} a un nouveau chapitre de sortie`
    } else {
        message = `Les mangas : ${newsPage.join(', ')} ont un nouveau chapitre de sortie`
    }
    return message;
}

function createNotification(newsPage) {
    let message = createMessage(newsPage);
    console.log(message);
    chrome.notifications.create(
        'Vostfree Notification', {
            type: 'basic',
            iconUrl: 'popup/assets/Vostfree.png',
            title: 'Vostfree Extension',
            message: message,
            priority: 2,
        }
    );
}

async function check_news() {
    let newsPage = [];

    let animes = await get_stored_value("anime_series");
    if (animes) {
        for (const anime of animes) {
            let details = await requestGetData('http://54.36.183.102:2900/anime/' + anime.anime);
            details = JSON.parse(details);
            console.log(details);
            if (anime.episodes < details.nbepisodes) {
                newsPage.push(details.title);
            }
        }
        if (newsPage.length > 0) {
            createNotification(newsPage);
        }
    }
}


function createAlarm() {
    chrome.alarms.create("newsAlarm", {
        when: Date.now(),
        periodInMinutes: 1440,
    });
}

createAlarm();

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name == "newsAlarm") {
        check_news();
    }
});