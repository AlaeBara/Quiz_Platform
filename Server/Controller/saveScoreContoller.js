const { result, collection } = require("../BD/mongo");

const saveScore = async (req, res) => {
    const { id, filier, score } = req.body;
    try {
        const info = await collection.findOne({ Id: id });
        
        if (!info) {
            console.log('User not found');
            return res.status(404).send('User not found');
        }
        
        const save = await result.create({
            Id: id,
            Nom: info.Nom,
            Prenom: info.Prenom,
            Filier: filier,
            Note: score,
            Date: new Date()
        });

        console.log('Your score added successfully');
        res.status(200).send('Your score added successfully');
    } catch (error) {
        console.error("Error in /saveScore: " + error.message);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { saveScore };
