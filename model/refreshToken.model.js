const {sequelize , Sequelize} = require(".")
const config = require("../config/auth.config")
const {v4:uuidv4} = require("uuid")

module.exports = (sequelize,Sequelize) => {
    const RefreshToken = sequelize.define("refreshToken",{
        token:{
            type:Sequelize.STRING
        },
        expiryDate:{
            type:Sequelize.DATE
        }
    });
    RefreshToken.createToken = async function (user) {
        let expireAt = new Date();
        expireAt.setSeconds(expireAt.getSeconds()+config.jwtRefreshExpiration)
        let _token = uuidv4();
        let refreshToken = await this.create({
            token: _token,
            userId:user.id,
            expiryDate:expireAt,
        })
        return refreshToken.token
    }
    RefreshToken.verifyExpiration = (token) =>{
        return token.expiryDate.getTime() < new Date().getTime()
    }
    return RefreshToken;
}