const { chat, getAllChats, chatList } = require("../controllers/chat");
const { checkApiKey } = require("../middlewares/apiKey");
const router = require("express").Router();

router.route("/chat/:apiKey").post(checkApiKey, chat);
router.route("/getchats/:apiKey").get(checkApiKey, getAllChats);
router.route("/chat/list/:apiKey").get(checkApiKey, chatList);

module.exports = router;
