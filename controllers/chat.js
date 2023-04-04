const Query = require("../models/Query");
const Chat = require("../models/Chat");
const { createCompletionChatGTP } = require("../chatGTP");
const { v4: uuid } = require("uuid");

exports.chat = async (req, res) => {
  try {
    const tempId = uuid();
    await Query.updateOne(
      { _id: req.body.queryId },
      { $push: { texts: { message: req.body.message, textBy: 1 } } }
    );
    const { texts } = await Query.findOne({
      _id: req.body.queryId
    })
    const messageData = texts.map((e) => {
      // return {
      //   role: e.textBy === 1 ? 'user' : 'assistant',
      //   content: e.message
      // }
      return `${e.textBy === 1 ? 'Q:' : 'A:'}${e.message}`
    })

    const { data } = await createCompletionChatGTP({
      message: messageData.join('\n'),
    });
    await Query.updateOne(
      { _id: req.body.queryId },
      {
        $push: {
          texts: { message: data.choices[0]?.text, textBy: 0 },
        },
      }
    );
    res.send({
      message: data.choices[0]?.content,
      _id: data.choices[0] ? tempId : undefined,
    });
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
};

exports.getAllChats = async (req, res) => {
  try {
    const query = await Query.findOne({ _id: req.query.queryId });
    if (!query)
      return res
        .status(400)
        .send({ success: false, message: "Query doesn't exist" });
    res.send(query);
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
};

exports.chatList = async (req, res) => {
  try {
    const query = await Chat.find({
      uid: req.userId
    })
    if (!query)
      return res
        .status(400)
        .send({ success: false, message: "Query doesn't exist" });
    res.send(query);
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
}

exports.addChat = async (req, res) => {
  try {
    const newQuery = new Query({ texts: [] });
    const { _id } = await newQuery.save();

    const newChat = new Chat({
      uid: req.userId,
      name: req.body.name,
      queryId: _id
    });
    await newChat.save()
    res.send({
      message: '新建成功'
    })

  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
}

exports.removeChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      _id: req.body.id
    })
    if (!chat) {
      return res
        .status(400)
        .send({ success: false, message: "chat不存在" });
    }
    await Chat.deleteOne({
      _id: chat._id
    })
    await Query.deleteOne({
      _id: chat.queryId
    })
    res.send({
      message: '删除成功'
    })

  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
}
