const { collection,teachers } = require("../BD/mongo");
const jwt = require("jsonwebtoken");
const secretKey = "AlaeddineIsil";

const loginUser = async(req,res)=>{

    const { id, password } = req.body;
    try {
        const check = await collection.findOne({ Id: id, Password: password });
        const check_admin = await teachers.findOne({ Id: id, Password: password });
        if (check) {
            const token = jwt.sign({ id: check.Id, filier: check.Filier }, secretKey, { expiresIn: "1h" });
            res.json({ status: "success", token, info: check });
        } 
        else if(check_admin){
            const token = jwt.sign({ id: check_admin.Id}, secretKey, { expiresIn: "1h" });
            res.json({ status: "success_admin", token, info: check_admin });
        }
        else {
            res.json({ status: "failure" });
        }
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ status: "fail" });
    }

}


module.exports={loginUser}