const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function changeGender(text, targetGender) {
  try {
    if (!text.length || !targetGender.length) {
      throw Error('text or targetGender not found !');
    }
    const prompt = `התאם את הטקסט הבא למגדר ${targetGender} בצורה המדויקת ביותר מבלי לשנות מקומות שאינם קשורים למגדר:\n\n"${text}"`;
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4',
    });
    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    throw new Error('Could not change the gender of the text.');
  }
}

module.exports = {
  changeGender,
};
