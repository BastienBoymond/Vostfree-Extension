function createMangaButton(url) {
    let container = document.getElementsByClassName('slide-middle')[0];
    container.innerHTML += `<button class="manga-button" id=${url} style="border: none;
                color: white;
                background-color: #3d94c0;
                padding: 5px;
                text-align: center;
                display: inline-block;
                font-size: 12px;
                cursor: pointer;
                font-family: roboto condensed,trebuchet ms,Arial,sans-serif;"
                >Lire le manga</button>`;
}

function modifyDom() {
    if (document.getElementsByClassName('new_player_top')[0] != null) {
        let title = document.getElementsByTagName('h1')[0].innerText.replace(' VOSTFR', '').replace(' FRENCH', '').toLowerCase();
        title = title.replace(/[ ]/g, '-');
        let url = 'https://www.japscan.ws/manga/' + title + '/'
        chrome.runtime.sendMessage({url: url}, function(response) {
            if (response === true) {
                createMangaButton(url);
            }
        });
        console.log(title);
    }
}

modifyDom();

window.onclick = function(event) {
    const target = event.target;
    console.log(target);
    if (target.matches('.manga-button')) {
        window.location.href = target.id;
    }
}

window.onmouseover = function(event) {
    const target = event.target;
    if (target.matches('.manga-button')) {
        target.style.opacity  = "0.7";
    }
}

window.onmouseout = function(event) {
    const target = event.target;
    if (target.matches('.manga-button')) {
        target.style.opacity  = "1";
    }
}