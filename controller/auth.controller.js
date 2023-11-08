const db = require("../models")
const config = require("../config/auth.config")
// const User = db.user
// const Role = db.role
// const RefreshToken = db.refreshToken
const { user: User, role: Role } = db
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { request } = require("express")
const Op = db.Sequelize.Op

exports.signup = (req, res) => {
    User.create({
        user: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    }).then((user) => {
        if (req.body.roles) {
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles => {
                user.setRoles(roles).the(() => {
                    res.send({ message: "SignUp Success" })
                })
            })
        } else {
            user.setRoles([1])
            res.send({message : "SignUp Success"})
        }
    }).catch((err)=> {
        res.status(500).send({message:err.message})
    })
}