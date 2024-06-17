const axios = require('axios');
const fs = require('fs');
const path = require('path');
const images = [
  'https://scontent.ftlv27-1.fna.fbcdn.net/v/t39.30808-6/447399378_10163338884178132_6064586654729723968_n.jpg?stp=dst-jpg_p960x960&amp;_nc_cat=110&amp;ccb=1-7&amp;_nc_sid=5f2048&amp;_nc_ohc=jxorDNW3Xh4Q7kNvgEf3Ezm&amp;_nc_ht=scontent.ftlv27-1.fna&amp;oh=00_AYA6e8fW2QuBpPfZPdeRm8Jlk5W-YVsBOtWQjcPpcXElsQ&amp;oe=66678A5D',
  'https://scontent.ftlv27-1.fna.fbcdn.net/v/t39.30808-6/447725256_10163338884193132_9097700026079563383_n.jpg?stp=dst-jpg_p960x960&amp;_nc_cat=100&amp;ccb=1-7&amp;_nc_sid=5f2048&amp;_nc_ohc=GhGGvxcr7GMQ7kNvgFabxRS&amp;_nc_ht=scontent.ftlv27-1.fna&amp;oh=00_AYAo3umbsI8NlKiJG55LooYTb5qvqopmO-OMv7e2TyU_zg&amp;oe=66679944',
  'https://scontent.ftlv27-1.fna.fbcdn.net/v/t39.30808-6/447717381_10163338884183132_2110723873346920258_n.jpg?stp=dst-jpg_p960x960&amp;_nc_cat=108&amp;ccb=1-7&amp;_nc_sid=5f2048&amp;_nc_ohc=EvcSn0O5QGEQ7kNvgFj5A7I&amp;_nc_ht=scontent.ftlv27-1.fna&amp;oh=00_AYCV72cvrQ8chEnZGX5I4kcJv4SbLh3mNP4I7EydzHfKCg&amp;oe=66678571',
  'https://scontent.ftlv27-1.fna.fbcdn.net/v/t39.30808-6/445815875_10163338884218132_5233452614849885830_n.jpg?stp=dst-jpg_p960x960&amp;_nc_cat=108&amp;ccb=1-7&amp;_nc_sid=5f2048&amp;_nc_ohc=NJ07VnEdpygQ7kNvgF1_J7C&amp;_nc_ht=scontent.ftlv27-1.fna&amp;oh=00_AYA2AtC7su2kUvk1ztZNrzjcITsuyeZ24CRzZah38z8hKQ&amp;oe=6667A031',
  'https://scontent.ftlv27-1.fna.fbcdn.net/v/t39.30808-6/447733180_10163338884188132_1068563696912551549_n.jpg?stp=dst-jpg_p960x960&amp;_nc_cat=100&amp;ccb=1-7&amp;_nc_sid=5f2048&amp;_nc_ohc=2Ilkky0dpCQQ7kNvgGIHf8N&amp;_nc_ht=scontent.ftlv27-1.fna&amp;oh=00_AYDgzW9nZi0f7_a9V6AQR9f_nnwjmHD_7uqIr9en_dI64Q&amp;oe=666797BE',
];

// const images = [
//   'https://img.yad2.co.il/Pic/202404/30/2_2/o/y2_1_05392_20240430150012.jpeg',
//   'https://img.yad2.co.il/Pic/202404/30/2_2/o/y2_2_04335_20240430150017.jpeg',
//   'https://img.yad2.co.il/Pic/202404/30/2_2/o/y2_3_04656_20240430150031.jpeg',
//   'https://img.yad2.co.il/Pic/202404/30/2_2/o/y2_4_08562_20240430150036.jpeg',
//   'https://img.yad2.co.il/Pic/202404/30/2_2/o/y2_5_02553_20240430150144.jpeg',
//   'https://img.yad2.co.il/Pic/202404/30/2_2/o/y2_6_07173_20240430150147.jpeg',
//   'https://img.yad2.co.il/Pic/202404/30/2_2/o/y2_7_09025_20240430150149.jpeg',
//   'https://img.yad2.co.il/Pic/202404/30/2_2/o/y2_8_01663_20240430150152.jpeg',
//   'https://img.yad2.co.il/Pic/202404/30/2_2/o/y2_9_06310_20240430150154.jpeg',
// ];

const desktopPath = path.join(__dirname, 'Desktop');

if (!fs.existsSync(desktopPath)) {
  fs.mkdirSync(desktopPath);
}

images.forEach((image, index) => {
  axios({
    method: 'get',
    url: image,
    responseType: 'arraybuffer',
  })
    .then((response) => {
      const filePath = path.join(desktopPath, `image_${index + 1}.jpeg`);
      fs.writeFileSync(filePath, response.data);
      console.log(`Image ${index + 1} downloaded successfully!`);
    })
    .catch((error) => {
      console.error(`Error downloading image ${index + 1}:`, error);
    });
});
