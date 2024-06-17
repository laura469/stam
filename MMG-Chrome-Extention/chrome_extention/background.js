chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.from === 'content') {
    if (message.topic === 'faceChangerConnection') {
      connectFaceChanger();
    } else if (message.commentsData) {
      sendDataToServer(message.commentsData);
    }
  }
});

async function sendDataToServer(data) {
  const response = await fetch('http://localhost:3100/addresses/new', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  console.log(response);
}

function connectFaceChanger() {
  const extId = 'cbhmnopfaciecgmhedllmplkmidejiig'; //actual ID extension
  const comPort = chrome.runtime.connect(extId); //connects to extension
  comPort.postMessage('request'); //sends to extension
}

function sendMassageToContent(message) {
  console.log('run');
  chrome.tabs.query({ active: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
}

chrome.runtime.onConnectExternal.addListener(function (port) {
  port.onMessage.addListener(function (msg) {
    sendMassageToContent({ from: 'background' });
  });
});
