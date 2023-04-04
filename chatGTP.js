const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function createCompletionChatGTP({ message }) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: message,
    max_tokens: 2048,
    temperature: 0,
  });
  // const response = await openai.createChatCompletion({
  //   model: "gpt-3.5-turbo",
  //   message: message,
  //   // max_tokens: 2048,
  //   // temperature: 0,
  // });

  return response;
}

//生成图片
async function createImage({ message, limit = 2, size = "512x512", format = "b64_json" }) {
  const response = await openai.createImage({
    prompt: message,
    n: limit,
    size: size,
    response_format: format
  });
  return response;
}

module.exports = { createCompletionChatGTP, createImage };
