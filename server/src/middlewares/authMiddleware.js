const jwt = require('jsonwebtoken');
const isLoggedIn = (req , res, next)=>{
    try{
        const token = req.headers.authorization;
        console.log(token);
        // console.log("HIIIII");
         if (!token) {
            return res.status(401).send({ status: false, message: "Token is missing" });
        }
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        console.log(decoded);
        if(decoded)
        {
            req.user = decoded;
            next();
        }
        else
        {
            return res.status(401).send({ status: false, message:"Unvalid user" });
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(400).send({status:false , error:err});
    }
}

module.exports = {isLoggedIn};