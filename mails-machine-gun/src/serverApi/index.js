export default {
  sendMails,
};

async function sendMails(data) {
  const response = await fetch('http://localhost:3100/mail/send', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const res = await response.json();
  console.log(res);
}
async function sendMail(data) {
  const response = await fetch('http://localhost:3100/mail/send/one', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const res = await response.json();
  console.log(res);
}
