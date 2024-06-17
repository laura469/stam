let imgHash = {};
let avatarsImg = [];
let srcArr = [];
let counter = 0;
let requestFromMMGExt = false;

function setRelevantImgTags() {
  const RESrcFromApi = /images.generated.photos/;
  const imgArray = [...document.querySelectorAll('img')];
  const avatarsImg = imgArray.filter(
    (img) =>
      img.classList[0] !== 'reactions-icon' &&
      img.className.split('-')[0] !== 'datalet' &&
      !RESrcFromApi.test(img.src)
  );
  return avatarsImg;
}

function createImgHashMap(array) {
  const hashMap = {};
  counter = 0;
  array.forEach((img) => {
    if (!hashMap[img.src]) {
      hashMap[img.src] = {};
      counter++;
    }
  });
  return hashMap;
}

async function setImgTagHmAndArr() {
  avatarsImg = setRelevantImgTags();
  imgHash = { ...imgHash, ...createImgHashMap(avatarsImg) };
  if (srcArr.length) {
    return setPictures();
  } else {
    return backgroundConnection('getPictureSrc');
  }
}

async function setPictures() {
  avatarsImg.forEach((imgTag) => {
    if (imgHash[imgTag.src]) {
      if (!imgHash[imgTag.src]['newSrc']) {
        const url = srcArr.pop();
        imgHash[imgTag.src]['newSrc'] = url;
        imgTag.src = url;
        imgHash[url] = { newSrc: url };
      } else {
        imgTag.src = imgHash[imgTag.src]['newSrc'];
      }
    }
  });
  trimDetails();
  return changeMails();
}

chrome.runtime.onMessage.addListener(async function (request) {
  if (request.from === 'popup') {
    if (request.topic === 'startChangeSrc') {
      try {
        setImgTagHmAndArr();
      } catch (e) {
        console.log(e);
      }
    }
  } else if (request.from === 'background') {
    if (request.topic === 'urlsSrc') {
      srcArr = [...srcArr, ...request.srcArr];
      setPictures();
    } else if (request.topic === 'changeFaces') {
      requestFromMMGExt = true;
      await setImgTagHmAndArr();
      console.log('stopProcess');
      //todo: need to check if this function invoke in time
    }
  }
});

async function backgroundConnection(topic) {
  chrome.runtime.sendMessage({ topic, from: 'content' }, (response) => {
    console.log(response);
    return response;
  });
}
