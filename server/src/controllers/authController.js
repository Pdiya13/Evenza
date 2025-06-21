const { hashPassword } = require('../helper/authHelper');
const {userModel} = require('../models/user');

const signupController = async(req, res) => {
    try{
        const {name , email, password , role} = req.body;

        const hashedPassword = await hashPassword(password);

        userModel.create({
            name : name,
            email : email,
            password : hashedPassword,
            role : role,
        });

        res.status(200).send({
            status : true,
            message : "User Registered Sucessfully "
        })
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in signin",
            error
        })
    }
}