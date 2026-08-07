const jwt = require("jsonwebtoken");

module.exports.createAccessToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    }
    return jwt.sign(data, process.env.JWT_SECRET);
}

module.exports.verify = (req, res, next) => {
    let token = req.headers.authorization;
    if(typeof token === "undefined"){
        return res.status(401).send({auth: "Failed. No Token"});
    }else{
        token = token.slice(7, token.length);

        jwt.verify(token, process.env.JWT_SECRET, function(err, decodedToken){
            if(err){
                return res.status(403).send({auth: "Failed", message: err.message})
            }else{
                req.user = decodedToken;

                next();
            }
        })
    }
};

module.exports.errorHandler = (err, req, res, next) => {
    const errorMessage = err.message || "Internal Server Error";

    let formattedError = {
        error: {
            message: errorMessage,
            errorCode: err.code || "SERVER_ERROR",
            details: err.details || null
        }
    };

    if(formattedError.error.message.includes("Validation failed")){
        return res.send("You need to check your required fields if it has inputs")
    }
    else{
        return res.status(err.statusCode || 500).json(formattedError)
    }
}