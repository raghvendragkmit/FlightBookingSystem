const dotenv = require("dotenv")
dotenv.config();
const db = require("../connection");
exports.isAdmin = (req,res,next)=>
{
    let id = req.id;
    let email = req.email;
    if (id == 1 && email == process.env.ADMIN_EMAIL)
       return next();
    else
        return res.status(403).json({error:"Admin access required"})
}


