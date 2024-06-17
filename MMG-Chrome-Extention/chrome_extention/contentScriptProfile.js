function clickOnDetailsBtn() {
  const detailsDiv = document.querySelector(
    '.pv-top-card--list.pv-top-card--list-bullet.mt1'
  );
  const aTags = [...detailsDiv.querySelectorAll('a')];
  const correctATag = aTags.filter((a) => a.innerText === 'Contact info')[0];
  correctATag.click();
}

function getEmailData() {
  console.log('fff');
  const emailSection = document.querySelector(
    '.pv-contact-info__contact-type.ci-email'
  );
  return emailSection.innerText.match(
    /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/
  )[0];
}

function setImgUrl(str) {
  const questionMarkSplit = str.split(/e=/);
  if (questionMarkSplit[0][questionMarkSplit[0].length - 1] !== '?') {
    return [questionMarkSplit[0], '?e=', questionMarkSplit[1]].join('');
  } else {
    return str;
  }
}

function getDataFromProfilePage() {
  const emojiRegex =
    /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/gu;
  const nonASCII = /[^\u0000-\u007F]+/g;
  const nameString = document.querySelector(
    '.inline.t-24.t-black.t-normal.break-words'
  ).innerText;
  const namePosition = document.querySelector(
    '.mt1.t-18.t-black.t-normal.break-words'
  ).innerText;
  const imgString = document.querySelector(
    'img.presence-entity__image.pv-top-card__photo.lazy-image.ember-view'
  ).src;
  const img = setImgUrl(imgString);
  return {
    img,
    name: nameString
      .replace(/'/g, '')
      .replace(emojiRegex, '')
      .replace(nonASCII, ''),
    position: namePosition
      .replace(/'/g, '')
      .replace(emojiRegex, '')
      .replace(nonASCII, ''),
  };
}

chrome.runtime.onMessage.addListener(async function (request) {
  if (request.from === 'popup') {
    if (request.topic === 'startCollecting') {
      try {
        const profileObj = getDataFromProfilePage();
        await clickOnDetailsBtn();
        return setTimeout(() => {
          const mail = getEmailData();
          backgroundConnection([{ ...profileObj, mail }]);
        }, 2000);
      } catch (e) {
        console.log(e);
      }
    }
  }
});

function backgroundConnection(commentsData) {
  chrome.runtime.sendMessage(
    { commentsData, from: 'content' },
    (response) => {}
  );
}
