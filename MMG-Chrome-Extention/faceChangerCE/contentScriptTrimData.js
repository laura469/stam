function changeMails() {
    const comments = [...document.querySelectorAll('.comments-comment-item')]
    const msgWithMails = comments.filter((comm, key) => comm.innerText
        .replace(/\n/, '').split(' ')
        .filter(str => /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi.test(str)).length)
    msgWithMails.forEach(msg => {
        const mail = msg.innerHTML.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/)[0]
        const newMail = encryptMail(mail)
        const massageParts = msg.innerHTML.split(mail)
        const newMassage = massageParts.reduce((acc, part, key) => acc + part + (key < massageParts.length - 1 ? newMail : ''), '')
        msg.innerHTML = newMassage
    })
    backgroundConnection('MMGConnection')
}

function encryptMail(mail) {
    const mailParts = mail.split('@')
    const name = mailParts[0].split("").reverse().join("")
    const brand = mailParts[1].split('.')[0].split("").reverse().join("")
    const newMail = name.slice(name.length / 2) + '@' + brand.slice(brand.length / 2) + '.com'
    return newMail
}


function trimDetails() {
    const massages = [...document.querySelectorAll('.comments-comment-item.comments-comments-list__comment-item')]
    const messagesNames = massages.map(massage =>
        [...massage.querySelectorAll('.comments-post-meta__name-text.hoverable-link-text.mr1')])
    const jobDescriptions = massages.map(massage =>
        [...massage.querySelectorAll('.comments-post-meta__headline.t-12.t-normal.t-black--light')])
    const authorName = [...document.querySelectorAll('.feed-shared-actor__name.t-14.t-bold.hoverable-link-text.t-black')]
    const authorDesc = [...document.querySelectorAll('.feed-shared-actor__description.t-12.t-normal.t-black--light')]
    const mainName = [...document.querySelectorAll('.single-line-truncate.t-16.t-black.t-bold.mt2.profile-rail-card__name')]
    const mainDesc = [...document.querySelectorAll('.profile-rail-card__description.t-12.t-black--light.t-normal.mt1')]
    stringsCutter(messagesNames)
    stringsCutter(jobDescriptions)
    stringsCutter(authorName)
    stringsCutter(authorDesc)
    stringsCutter(mainName)
    stringsCutter(mainDesc)
}

function stringsCutter(elementsArray) {
    const flatArray = elementsArray.flat(2)
    flatArray.forEach(name => {
        const nameString = name.innerText
        const firstName = nameString.split(' ')[0]
        name.innerHTML = firstName;
    })
}


