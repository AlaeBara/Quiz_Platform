const { collection } = require("../../BD/mongo");

const addStudent = async(req,res)=>{

    const { id,password,nom,prenom,filier } = req.body;
    try {
        const student = await collection.create({
            Id: id,
            Password: password,
            Nom: nom,
            Prenom: prenom,
            Filier: filier,
        });
        res.json("Student added successfully");
    } catch (error) {
        console.error("Error in /addStudent: " + error.message);
        res.json("Error adding student");
        res.status(500).send("Internal Server Error");
    }

}


module.exports={addStudent}