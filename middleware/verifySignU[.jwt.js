const db = require("../model")
const ROLES = db.ROLES;
const User = db.user

checkDuplicateUserOrEmail = (req,res,next) => { 
    //CheckUser
    User.findOne({
        where:{
            username: req.body.username
        }
    }).then(user=>{
        if (user){
            res.status(400).send({message: "Failed Username is already exists"})
            return
        }
        //Check Email
        User.findOne({
            where:{
                email: req.body.email
            }
        }).then(user=>{
            if (user){
                res.status(400).send({message: "Failed Username is already exists"})
                return
            }
            next()
            
        })
    })
}

checkRolesExists = (req , res , next)=> {
    if (req.body.roles) {
        for(let i = 0 ; o < req.body.roles.lenght; i++){
            if (!ROLES.includes(req.body.roles[i])){
                res.status(400).send({message:"Failed! Role doesn't exist  "+ req.body.roles[i]})
            }
        }
    }
    next()
}

const verifySignUp = {
    checkDuplicateUserOrEmail : checkDuplicateUserOrEmail,
checkRolesExists:checkRolesExists,
}
module.exports = verifySignUp;