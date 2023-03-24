const { getImage } = require("../controllers/image");
const { checkApiKey } = require("../middlewares/apiKey");
const router = require("express").Router();

router.route("/image/:apiKey").post(checkApiKey, getImage);

module.exports = router;
