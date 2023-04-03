const { chat, getAllChats, chatList, addChat, removeChat } = require("../controllers/chat");
const { checkApiKey } = require("../middlewares/apiKey");
const router = require("express").Router();

router.route("/chat/:apiKey").post(checkApiKey, chat);
router.route("/chat/getchats/:apiKey").get(checkApiKey, getAllChats);
router.route("/chat/list/:apiKey").get(checkApiKey, chatList);
router.route("/chat/add/:apiKey").post(checkApiKey, addChat);
router.route("/chat/remove/:apiKey").post(checkApiKey, removeChat);

module.exports = router;
