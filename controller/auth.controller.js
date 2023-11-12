const db = require("../model")
const config = require("../config/auth.config")
const { user: User, role: Role , refreshToken: RefreshToken } = db
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { request } = require("express")
const Op = db.Sequelize.Op

exports.signup = (req, res) => {
    User.create({
        username: req.body.username,
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
                user.setRoles(roles).then(() => {
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

exports.signin = (req,res) =>{
    User.findOne({
        where: {
          username: req.body.username,
        },
      })
      .then( async (user) => {
        if (!user) {
          return res.status(404).send({ message: "User not found" });
        }
        let passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (!passwordIsValid) {
          return res
            .status(401)
            .send({ accessToken: null, message: "Invalid Password" });
        }
        const token = jwt.sign({ id: user.id },
        config.secret, {
          algorithm: "HS256",
          allowInsecureKeySizes: true,
          expiresIn: config.jwtExpiration, //24hr = 64 *64*24
        });
        const refreshToken = await RefreshToken.createToken(user);
        let authorities = [];
        user.getRoles().then((roles) => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLES_" + roles[i].name.toUpperCase());
          }
          res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token,
            refreshToken: refreshToken,
          });
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });

}

exports.refreshToken = async (req,res) => {
  const {refreshToken:refreshToken} = req.body

  if (requestToken == null) {
    return res.status(403).json({message : "Refresh Token is required!!!"})
  }
  try {
    let refreshToken = await RefreshToken.findOne({
      where : {
        token : requestToken,
      }
    })
    if (!refreshToken) {
      res.status(403).json({message : "Refresh Token is not in database!"})
      return;
    }
    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({
        where: {
          id:refreshToken.id
        }
      })
      res.status(403).json({message:"Refresh Token was expired . Please make new Signin!!!",})
      return
    }
    const user = await refreshToken.getUser();
    let newAccessToken = jwt.sign({id: user.id},
    config.secret,
    {
      algorithm: "HS256",
      allowInsecureKeySizes:true,
      expiresIn:config,jwtExpiration,
    })
    return res.status(200).json({
      accessToken:newAccessToken,
      refreshToken:refreshToken.token
    })
  }catch (err) {
    return res.status(500).send({message:err})
  }
}