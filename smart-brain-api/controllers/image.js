const clarifai = require("clarifai");

const app = new clarifai.App({
  apiKey: "41cdd0078df84e479968da3daf3f4ca6",
});

const handleApiCall = (req, res) => {
  app.models
    .predict(
      // .predict('53e1df302c079b3db8a0a36033ed2d15', this.state.input)
      clarifai.FACE_DETECT_MODEL,
      req.body.input
    )
    .then((data) => {
      res.json(data);
    })
    .catch(() => res.status(400).json("Unable to work with the api"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch(() => res.status(400).json("Unable to get entries"));
};

module.exports = {
  handleImage,
  handleApiCall,
};
