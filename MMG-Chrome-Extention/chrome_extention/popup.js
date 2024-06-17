document.addEventListener(
  'DOMContentLoaded',
  function () {
    document
      .querySelector('#main_button')
      .addEventListener('click', startToConnect, false);
  },
  false
);
document.addEventListener(
  'DOMContentLoaded',
  function () {
    document
      .querySelector('#facebook_button')
      .addEventListener('click', startToConnectPosts, false);
  },
  false
);

function startToConnect() {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      from: 'popup',
      topic: 'startCollecting',
    });
  });
}
function startToConnectPosts() {
  console.log('startToConnectPosts');
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      from: 'popup',
      topic: 'startCollectingFacebook',
    });
  });
}
