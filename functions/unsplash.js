const functions = require("firebase-functions");
const Unsplash = require("unsplash-js").default;
const toJson = require("unsplash-js").toJson;
const fetch = require("node-fetch");
global.fetch = fetch;

const unsplash = new Unsplash({
  applicationId: functions.config().unsplash.key,
  secret: functions.config().unsplash.secret
});

exports.getImages = function(searchTerm, page) {
  return unsplash.search
    .photos(searchTerm, page, 10, "landscape")
    .then(toJson)
    .then(json => json)
    .catch(e => console.log(e));
};
