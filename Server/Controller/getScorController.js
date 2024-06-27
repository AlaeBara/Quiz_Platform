const { result } = require("../BD/mongo");

const getScore = async (req, res) => {
    const { id } = req.query;
    try {
        const listScore = await result.find({ Id: id });
        res.json(listScore);
    } catch (error) {
        console.error("Error in /getScore: " + error.message);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { getScore };
