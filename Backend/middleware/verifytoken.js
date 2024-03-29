const jwt = require("jsonwebtoken");
const SECRETKEY = "$@IP@V@N";

const verifytoken=(req,res,next)=>{

    const token_in_headers = req.headers.jwttoken;
    // console.log("JWT TOKEN IN GOT IN MIDDLEWARE :"+token_in_headers);
    if(!token_in_headers){
       return  res.status(400).json({msg:"SOME PROBLEM WITH JWTTOKEN IN HEADERS(in middleware verifytoken.js)"})
    }

    jwt.verify(token_in_headers,SECRETKEY,(err,user)=>{
        if(err) {
           return  res.status(400).json({err,msg:"ERROR IN verifytoken.js"});
        }
       
        // doubt??
        req.user = user;

        // console.log(req.user)

        next();

    })
}

module.exports={verifytoken};