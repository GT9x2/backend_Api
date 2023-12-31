const {verifySignUp} = require("../middleware")
const controller  = require("../controller/auth.controller")

module.exports = function (app){

    app.use((req,res,next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"  
    )
    next()
})
    app.post(
        "/api/auth/signup",
        [verifySignUp.checkDuplicateUserOrEmail, verifySignUp.checkRolesExists],
        controller.signup    
    )
    app.post(
        "/api/auth/signin",
        controller.signin

    )
    app.post("/api/auth/refreshToken",controller.refreshToken)
}