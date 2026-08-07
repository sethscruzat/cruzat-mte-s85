const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User.js");
const auth = require("../middleware/auth.js");

module.exports.registerUser = async (req, res) => {
    const {email, password} = req.body
    try{
        if(!email.includes("@")){
            return res.status(400).send({error: "Email invalid."});
        }

        if(password.length < 8){
            return res.status(400).send({error: "Password must be  at least 8 characters."});
        }

        const emailCheck = await User.findOne({email: email})

        if(emailCheck){
            return res.status(409).send({error: "Duplicate email found."});
        }

        let newUser = new User ({
            email: email, 
            password: bcrypt.hashSync(password, 10)
        });

        const response = await newUser.save();
        if(response){
            res.status(201).send({
                message: "Registered Successfully"
            })
        }
    }catch(error){
        auth.errorHandler(error, req, res);
    }
}

module.exports.loginUser = async (req, res) =>{
    const {email, password} = req.body
    try{
        if(!email.includes('@')){
            return res.status(400).send({error: "Invalid email."})
        }

        const response = await User.findOne({email: email})
        if(!response){
            return res.status(404).send({error: "Email not found."})
        }

        if(bcrypt.compareSync(password, response.password)){
            return res.status(200).send({access: auth.createAccessToken(response)})
        }else{
            return res.status(401).send({error: "Email and password do not match"});
        }
    }catch(error){
        auth.errorHandler(error, req, res);
    }
}

module.exports.getUserDetails = async(req,res) =>{
    try{
        const response = await User.findById(req.user.id,{password: 0})

        if(!response){
            return res.status(404).send({ error: "User not found" });
        }

        return res.status(200).send({user: response})
    }catch(error){
        auth.errorHandler(error, req, res);
    }
}