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

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log(msg);
    doSomethingWith(msg).then(sendResponse);
    return true;
  });
  
async function doSomethingWith(msg) {
    let data = await requestGet(msg.url);
    return data;
}