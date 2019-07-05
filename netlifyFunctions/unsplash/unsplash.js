const axios = require("axios");

const { UNSPLASH_API_ID } = process.env;

const getImages = async function(searchTerm, page) {
  return await axios.get(
    `https://api.unsplash.com/search/photos?page=${page}&query=${searchTerm}&orientation=landscape`,
    {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_API_ID}`
      }
    }
  );
};

exports.handler = async event => {
  try {
    const images = await getImages(
      event.queryStringParameters.searchTerm,
      event.queryStringParameters.page
    );

    return {
      statusCode: 200,
      body: JSON.stringify(images.data)
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
