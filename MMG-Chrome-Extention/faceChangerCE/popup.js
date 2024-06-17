
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#main_button').addEventListener('click', startToConnect, false)
}, false)



function startToConnect() {
    chrome.tabs.query({currentWindow: true, active: true},
        function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                from:'popup',topic:'startChangeSrc'
            })
        })
}
