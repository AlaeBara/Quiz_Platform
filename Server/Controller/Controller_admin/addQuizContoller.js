const { quiz } = require("../../BD/mongo");

const addQuiz = async(req,res)=>{

    const { filier,question,option1,option2,option3,option4,answer,title } = req.body;
    try {
        const quizz = await quiz .create({
            Filier: filier,
            question: question,
            option1: option1,
            option2: option2,
            option3: option3,
            option4: option4,
            answer: answer,
            title: title,
        });
        res.json("quiz added successfully");
    } catch (error) {
        console.error("Error in /addQuiz: " + error.message);
        res.json("Error adding quiz");
        res.status(500).send("Internal Server Error");
    }

}


module.exports={addQuiz}