async function clickOnLoadBtn() {
  const btns = [
    ...this.document.getElementsByClassName(
      'comments-comments-list__load-more-comments-button artdeco-button artdeco-button--muted artdeco-button--1 artdeco-button--tertiary ember-view'
    ),
  ];
  const loadRegex = /Load more comments/;
  const loadBtn = btns.filter((el) => {
    return loadRegex.test(el.innerText);
  })[0];
  if (!loadBtn) throw Error('brake internal');
  loadBtn.click();
}

function getCommentWithMailData() {
  const emojiRegex =
    /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/gu;
  const nonASCII = /[^\u0000-\u007F]+/g;
  const comments = [
    ...document.getElementsByClassName('comments-comment-item'),
  ];
  // console.log('comments', comments);
  const msgWithMails = comments.filter(
    (comm, key) =>
      comm.innerText
        .replace(/\n/, '')
        .split(' ')
        .filter((str) =>
          /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi.test(str)
        ).length
  );
  // console.log('msgWithMails', msgWithMails);
  const commentData = msgWithMails.map((msg) => {
    // console.log('MSG', msg);
    const nameString = msg.querySelector(
      '.comments-post-meta__name.text-body-small-open.t-black'
    ).innerText;
    const namePosition = msg.querySelector(
      '.comments-post-meta__headline.t-12.t-normal.t-black--light'
    ).innerText;
    const obj = {
      img: msg.querySelector('img')?.src,
      name: nameString
        .replace(/'/g, '')
        .replace(emojiRegex, '')
        .replace(nonASCII, ''),
      position: namePosition
        .replace(/'/g, '')
        .replace(emojiRegex, '')
        .replace(nonASCII, ''),
    };
    try {
      obj.mail = msg
        .querySelector('.comments-comment-item-content-body')
        .innerText.match(
          /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/
        )[0];
    } catch (e) {}
    return obj;
  });
  return commentData;
}

chrome.runtime.onMessage.addListener(function (request) {
  if (request.from === 'popup') {
    if (request.topic === 'startCollecting') {
      const dropdownButton = document.querySelector(
        '.comments-sort-order-toggle__trigger.artdeco-dropdown__trigger.artdeco-dropdown__trigger--placement-bottom.ember-view'
      );
      dropdownButton.click();

      setTimeout(() => {
        const dropdown = document.querySelector(
          '.dropdown-options.comments-sort-order-toggle__content.artdeco-dropdown__content.artdeco-dropdown__content--is-open.artdeco-dropdown--is-dropdown-element.artdeco-dropdown__content--justification-left.artdeco-dropdown__content--placement-bottom.ember-view'
        );
        const options = Array.from(dropdown.getElementsByTagName('li'));
        const mostRecentOption = options.find((option) => {
          return option.textContent.includes('most recent');
        });
        if (mostRecentOption) mostRecentOption.click();
      }, 500);

      const loadCommentsInterval = setInterval(async () => {
        console.log('run....');
        try {
          const el = this.document.getElementsByClassName(
            'comments-comments-list__load-more-comments-button artdeco-button artdeco-button--muted artdeco-button--1 artdeco-button--tertiary ember-view'
          );
          console.log('el.length', el.length);
          if (el.length) {
            await clickOnLoadBtn();
          } else {
            const el2 = this.document.getElementsByClassName(
              'mv3 mr3 ml4 t-14 t-black--light'
            );
            if (el2.length) {
              throw Error('brake internal');
            }
            if (!el.length) {
              await clickOnLoadBtn();
            }
          }
        } catch (e) {
          console.log(e);
          clearInterval(loadCommentsInterval);
          backgroundConnection('data', getCommentWithMailData());
        }
      }, 3000);
    } else if (request.topic === 'startCollectingFacebook') {
      const posts = this.document.getElementsByTag('input');
      console.log('posts : ', posts);
    }
  } else if (request.from === 'background') {
    backgroundConnection('data', getCommentWithMailData());
  }
});

function backgroundConnection(topic, commentsData) {
  if (!commentsData?.length) return;
  console.log('commentsData', commentsData);
  chrome.runtime.sendMessage(
    { commentsData, from: 'content', topic },
    (response) => {}
  );
}
