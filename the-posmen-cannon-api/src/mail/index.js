'use strict';
const path = require('path');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

module.exports = {
  sendEmail,
  sendSingelEmail,
};
const blackList = ['sagi.be@moonactive.com'];

async function sendEmail(addresseeData) {
  if (blackList.includes(addresseeData['email'])) {
    return;
  }
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: process.env.USERNAME, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });

  fs.readFile(
    path.join(__dirname, '../../cv/ari gabay cv full stack.pdf'),
    async function (err, data) {
      try {
        let info = await transporter
          .sendMail({
            from: '"Ari Gabay" <arigabay19988@gmail.com>', // sender address
            to: addresseeData['email'], // list of receivers
            subject: `Ari Gabay Full Stack resume`, // Subject line
            attachments: [
              { filename: 'ari gabay cv full stack.pdf', content: data },
            ],
            html: `<div dir="rtl">

          <div>היי,</div></br>
          
          <div>ראיתי בלינקדין שהגבת על פוסט חיפוש עבודה וחשבתי שהקורות חיים שלי גם יכולים להיות רלוונטים.</div></br>
          
          
          <div>אני ארי גבאי מפתח Full-Stack, עבדתי ב 2 חברות סטראטאפ וצברתי שם המון ידע ונסיון בתחום הפיתוח.</div></br>
          <div>נסיון בטכנולוגיות :</div></br>
          <div dir="ltr">
          
          <div><strong> 1. React, Vue</strong></div></br>
          
          <div><strong>2. NodeJs - Express, NestJs (Microservices)</strong></div></br>
          
          <div><strong>3. Typescript</strong></div></br>
          
          <div><strong>4. SQL</strong></div></br>
          
          <div><strong>5. MongoDB</strong></div></br>
          
          <div><strong>6. Orm - TypeOrm, Sequelize, Mongoose</strong></div></br>
          
          <div><strong>7. Docker</strong></div></br>
          
          <div><strong>8. Cloud - AWS, Azure</strong></div></br>
          
          <div><strong>9. Test - JestJs</strong></div></br>
          </div>
          
          <br />
          
          <div>היום אני מחפש חברה יציבה עם סביבת עבודה צעירה בעלת קדמה טכנולוגית.</div></br>
          
          <div>בברכה,</div></br>
          
          <div>ארי גבאי.</div></br>
          
          <div>
              <br/>
              <br/>
              <div dir="ltr">
          
          <div>Hi,</div></br>
          
          <div>I saw on Linkedin that you commented on a job search post and I thought that my resume can be also relevant.</div></br>
          
          <div>I'm Ari Gabay, a Full Stack developer.</div></br>
          
          <div>I worked in 2 startup companies and accumulated a lot of knowledge and experience in the field of development there.</div></br>
          
          <div>Tech experience :</div></br>
          
          <div><strong> 1. React, Vue</strong></div></br>
          
          <div><strong>2. NodeJs - Express, NestJs (Microservices)</strong></div></br>
          
          <div><strong>3. Typescript</strong></div></br>
          
          <div><strong>4. SQL</strong></div></br>
          
          <div><strong>5. MongoDB</strong></div></br>
          
          <div><strong>6. Orm - TypeOrm, Sequelize, Mongoose</strong></div></br>
          
          <div><strong>7. Docker</strong></div></br>
          
          <div><strong>8. Cloud - AWS, Azure</strong></div></br>
          
          <div><strong>9. Test - JestJs</strong></div></br>
          
          <br />
          
          <div>Today I am looking for a stable company with a young, technologically advanced work environment.</div></br>
          
          <div>Regards,</div></br>
          
          <div>Ari Gabay.</div></br>
          
          <div>`,
          })
          .catch((e) => {
            throw e;
          });
        console.log(info);
        console.log('closing...');
        transporter.close();
        // setTimeout(() => {
        // }, 3000);
      } catch (e) {
        console.log(e);
        transporter.close();
      }
    }
  );
}
async function sendSingelEmail(addresseeData) {
  if (blackList.includes(addresseeData['email'])) {
    return;
  }
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: process.env.USERNAME, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });
  console.log('addresseeData', addresseeData);
  fs.readFile(
    path.join(__dirname, '../../cv/ari gabay cv full stack.pdf'),
    async function (err, data) {
      try {
        let info = await transporter
          .sendMail({
            from: '"Ari Gabay" <arigabay19988@gmail.com>', // sender address
            to: addresseeData['email'], // list of receivers
            subject: `Ari Gabay Full Stack resume`, // Subject line
            attachments: [
              { filename: 'ari gabay cv full stack.pdf', content: data },
            ],
            html: `<div dir="rtl">

          <div>היי,</div></br>
          
          <div>אני ארי גבאי מפתח Full-Stack, עבדתי ב 2 חברות סטראטאפ וצברתי שם המון ידע ונסיון בתחום הפיתוח.</div></br>
          <div>נסיון בטכנולוגיות :</div></br>
          <div dir="ltr">
          
          <div><strong> 1. React, Vue</strong></div></br>
          
          <div><strong>2. NodeJs - Express, NestJs (Microservices)</strong></div></br>
          
          <div><strong>3. Typescript</strong></div></br>
          
          <div><strong>4. SQL</strong></div></br>
          
          <div><strong>5. MongoDB</strong></div></br>
          
          <div><strong>6. Orm - TypeOrm, Sequelize, Mongoose</strong></div></br>
          
          <div><strong>7. Docker</strong></div></br>
          
          <div><strong>8. Cloud - AWS, Azure</strong></div></br>
          
          <div><strong>9. Test - JestJs</strong></div></br>
          </div>
          
          <br />
          
          <div>היום אני מחפש חברה יציבה עם סביבת עבודה צעירה בעלת קדמה טכנולוגית.</div></br>
          
          <div>בברכה,</div></br>
          
          <div>ארי גבאי.</div></br>
          
          <div>
              <br/>
              <br/>
              <div dir="ltr">
          
          <div>Hi,</div></br>
          
          <div>I'm Ari Gabay, a Full Stack developer.</div></br>
          
          <div>I worked in 2 startup companies and accumulated a lot of knowledge and experience in the field of development there.</div></br>
          
          <div>Tech experience :</div></br>
          
          <div><strong> 1. React, Vue</strong></div></br>
          
          <div><strong>2. NodeJs - Express, NestJs (Microservices)</strong></div></br>
          
          <div><strong>3. Typescript</strong></div></br>
          
          <div><strong>4. SQL</strong></div></br>
          
          <div><strong>5. MongoDB</strong></div></br>
          
          <div><strong>6. Orm - TypeOrm, Sequelize, Mongoose</strong></div></br>
          
          <div><strong>7. Docker</strong></div></br>
          
          <div><strong>8. Cloud - AWS, Azure</strong></div></br>
          
          <div><strong>9. Test - JestJs</strong></div></br>
          
          <br />
          
          <div>Today I am looking for a stable company with a young, technologically advanced work environment.</div></br>
          
          <div>Regards,</div></br>
          
          <div>Ari Gabay.</div></br>
          
          <div>`, // html body
          })
          .catch((e) => {
            throw e;
          });
        console.log(info);
        setTimeout(() => {
          console.log('closing...');
          transporter.close();
        }, 3000);
      } catch (e) {
        console.log(e);
        transporter.close();
      }
    }
  );
}
