// module.exports = {
//     HOST:"localhost",
//     USER:"root",
//     PASSWORD:"",
//     DB:"book",
//     dialect:"mysql",
//     pool:{
//         max:5,
//         min:0,
//         acquire:30000,
//         idle:10000
//     }
// }
require('dotenv').config()

module.exports = {
    HOST:process.env.HOST,
    USER:process.env.USER,
    PASSWORD:process.env.PASSWORD,
    DB:process.env.DB,
    dialect:"mysql",
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
}




// require('dotenv').config()
// module.exports={
//     HOST:"process.env.HOST",
//     USER:"process.env.USER",
//     PASSWORD:"process.env.PASSWORD",
//     DATABASE:"process.env.DATABASE"
// }
