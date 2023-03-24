const Query = require("../models/Query");
const { createImage } = require("../chatGTP");

exports.getImage = async (req, res) => {
    try {
        const { data } = await createImage({
            message: req.body.message,
            limit: req.body.limit,
            size: req.body.size,
            format: req.body.format,
        });

        res.send({
            message: data,
        });
    } catch (err) {
        res.status(400).send({ success: false, message: err.message });
    }
};
