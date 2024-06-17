chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  console.log(sender);
  console.log(sendResponse);
  if (message.from === 'content') {
    if (message.topic === 'getPictureSrc') {
      const srcArr = await getPictureSrc();
      const message = {
        from: 'background',
        topic: 'urlsSrc',
        srcArr,
      };
      sendMassageToContent(message);
    } else if (message.topic === 'MMGConnection') {
      connectMMGExtension();
    }
  }
});

async function getPictureSrc() {
  const data = await fetch(
    `https://api.generated.photos/api/v1/faces?api_key=HgCMsKkn5NrfXP7FKoginw&emotion=joy&age=adult&per_page=99`
  );
  const imgArray = await data.json();
  const urls = imgArray.faces.map((img) => img.urls[4]['512']);
  return urls;
}

function sendMassageToContent(message) {
  chrome.tabs.query({ active: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
}

chrome.runtime.onConnectExternal.addListener(function (port) {
  port.onMessage.addListener(function (msg) {
    const message = {
      from: 'background',
      topic: 'changeFaces',
    };
    sendMassageToContent(message);
  });
});

function connectMMGExtension() {
  const extId = 'icfdmnjkaenipnhbgekekphnbkbjhhmp';
  const port = chrome.runtime.connect(extId);
  port.postMessage('request');
}
