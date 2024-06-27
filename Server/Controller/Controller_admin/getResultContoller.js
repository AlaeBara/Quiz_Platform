const { result } = require("../../BD/mongo");

const getResult = async (req, res) => {
    const { filier } = req.query;
    try {
      const results = await result.find({ Filier: filier });
      console.log(results);
      res.json(results);
    } catch (error) {
      console.error("Error in /getResult: " + error.message);
      res.status(500).send("Internal Server Error");
    }
}
  
module.exports = { getResult };
  

