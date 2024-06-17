const tf = require('@tensorflow/tfjs-node');
const natural = require('natural');
const emojiRegex = require('emoji-regex');
const stopword = require('stopword');
const compromise = require('compromise');
const fs = require('fs');

const realEstateKeywords = [
  'בלעדיות',
  'מתווך',
  'משרד תיווך',
  'למכירה בבלעדיות',
  'נדלן',
  'מושכר',
  'השכרה',
  'דירה',
  'נכס',
  'סוכן',
];
const stylisticPatterns = [
  /\n\n/g, // Double newlines
  /🔥/g, // Fire emoji
  /🏡/g, // House emoji
  /⭐️/g, // Star emoji
  /✔️/g, // Checkmark emoji
  /✅/g, // Green checkmark emoji
  /📞/g, // Phone emoji
  /\d+ חדרים/g, // "X חדרים"
  /\bקומה \d+\b/g, // "קומה X"
  /\bמ\"ר\b/g, // "מ"ר"
  /דירה מושכרת/g, // "דירה מושכרת"
];

const tokenizer = new natural.WordTokenizer();

const loadModel = async () => {
  const model = await tf.loadGraphModel(
    'file://./real_estate_model_js/model.json'
  );
  return model;
};

const preprocessText = (text) => {
  const words = tokenizer.tokenize(text);
  const filteredWords = stopword.removeStopwords(words);
  return filteredWords.join(' ');
};

const filterRealEstatePatterns = (text) => {
  const words = tokenizer.tokenize(text);
  const filteredWords = stopword.removeStopwords(words);
  for (const keyword of realEstateKeywords) {
    if (filteredWords.includes(keyword)) {
      return false;
    }
  }
  return true;
};

const filterStylisticPatterns = (text) => {
  for (const pattern of stylisticPatterns) {
    if (pattern.test(text)) {
      return false;
    }
  }
  return true;
};

const filterPhoneNumbers = (text, phoneNumbers) => {
  const phoneMatches = text.match(
    /(\b\d{10}\b|\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b)/g
  );
  if (phoneMatches) {
    for (const phone of phoneMatches) {
      phoneNumbers[phone] = (phoneNumbers[phone] || 0) + 1;
      if (phoneNumbers[phone] >= 3) {
        return false;
      }
    }
  }
  return true;
};

const filterEmojis = (text) => {
  const emojiCount = (text.match(emojiRegex()) || []).length;
  return emojiCount <= 5;
};

const analyzeSentiment = (text) => {
  const doc = compromise(text);
  const sentiment = doc.sentiment().out('polarity');
  return sentiment >= 0;
};

const filterPosts = async (posts) => {
  const model = await loadModel();
  const phoneNumbers = {};

  return posts.filter((post) => {
    const processedText = preprocessText(post.postText);
    const input = tf.tensor([
      processedText.split(' ').map((word) => word.charCodeAt(0)),
    ]);
    const prediction = model.predict(input);
    const isRealEstate = prediction.dataSync()[0] > 0.5;

    return (
      !isRealEstate &&
      filterRealEstatePatterns(post.postText) &&
      filterStylisticPatterns(post.postText) &&
      filterPhoneNumbers(post.postText, phoneNumbers) &&
      filterEmojis(post.postText) &&
      analyzeSentiment(post.postText)
    );
  });
};

// Example usage
const posts = [
  // Place your posts here
  {
    postText:
      'למכירה בבלעדיות *\nבשכונת נגבה ברמת גן \nרחוב שדרות הצנחנים דירת 4 חדרים קומה 1 עורפית כ 90 מטר פלוס מרפסת שמש 10 מטר חניה רגילה מטבח משודרג יחידת הורים חניה רגילה \nיש משפחתון קטן  בקומת הקרקע, הדירה מושכרת 7000₪ לשוכרים בניין חדש בן וחצי\n👇לפרטים נוספים על הנכס 👇\n🔥שלומי מאנה המתווך החזק🔥: 0543000605\nווטצאפ: https://wa.me/0543000605',
    email: '',
  },
  {
    postText:
      'חדש להשכרה 🏡\n\nסמוך לצומת בן גוריון - קריניצי\n\nדירת 3.5 חדרים , שלושה חדרי שינה. \n\nדירה משופצת הכוללת שני מרפסות, מטבח חדש וחניה בטאב\nלפרטים ולכל שאלה: 054-460-6745 רז',
    email: '',
  },
];

filterPosts(posts).then((filteredPosts) => {
  console.log(filteredPosts);
});
