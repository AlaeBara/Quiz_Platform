const { quiz } = require("../BD/mongo");

const getQuizs = async(req,res)=>{

    const { filier } = req.body;
    try {
        const quizzes = await quiz.find({ Filier: filier });
        console.log(quizzes);
        res.json(quizzes);
    } catch (error) {
        console.error("Error in /getQuizOfuser: " + error.message);
        res.status(500).send("Internal Server Error");
    }

}


module.exports={getQuizs}