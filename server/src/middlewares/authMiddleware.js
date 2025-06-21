const jwt = require('jsonwebtoken');
const isLoggedIn = (req , res, next)=>{
    try{
        const token = req.headers.authorization;
        
    }
    catch(err)
    {
        console.log(err);
        res.status(400).send({status:false , error:err});
    }
}