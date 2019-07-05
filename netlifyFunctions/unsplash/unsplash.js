const Unsplash = require("unsplash-js").default;
const toJson = require("unsplash-js").toJson;
const fetch = require("node-fetch");
global.fetch = fetch;

const { UNSPLASH_API_ID, UNSPLASH_API_SECRET } = process.env;
const unsplash = new Unsplash({
  applicationId: UNSPLASH_API_ID,
  secret: UNSPLASH_API_SECRET
});

const getImages = function(searchTerm, page) {
  return unsplash.search
    .photos(searchTerm, page, 10, "landscape")
    .then(toJson)
    .then(json => json)
    .catch(e => console.log(e));
};

exports.handler = async event => {
  try {
    const images = await getImages(
      event.queryStringParameters.searchTerm,
      event.queryStringParameters.page
    );

    return {
      statusCode: 200,
      body: JSON.stringify(images)
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
