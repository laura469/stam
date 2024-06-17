// /**
//  * TODO(developer): Uncomment these variables before running the sample.
//  */
// const projectId = 'mails-machine-gun';
// const keyFilename = '../middleware/translator/credentials.json';

// const location = 'global';

// // Imports the Google Cloud Translation library
// const { TranslationServiceClient } = require('@google-cloud/translate');

// // Instantiates a client

// async function translateText(name) {
//   if (!name) return undefined;
//   const translationClient = new TranslationServiceClient({
//     projectId,
//     keyFilename,
//   });
//   const request = {
//     parent: `projects/${projectId}/locations/${location}`,
//     contents: [name],
//     mimeType: 'text/plain', // mime types: text/plain, text/html
//     sourceLanguageCode: 'en',
//     targetLanguageCode: 'he',
//   };

//   // Run request
//   const [response] = await translationClient.translateText(request);
//   const hebrewName = response.translations[0]['translatedText'];
//   return { englishName: name, hebrewName };
// }
