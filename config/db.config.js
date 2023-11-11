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
// require('dotenv').config()

// module.exports = {
//     HOST:process.env.HOST,
//     USER:process.env.USER,
//     PASSWORD:process.env.PASSWORD,
//     DB:process.env.DB,
//     dialect:"mysql",
//     pool:{
//         max:5,
//         min:0,
//         acquire:30000,
//         idle:10000
//     }
// }

module.exports ={
    HOST:"ep-young-bonus-77879839-pooler.us-east-1.postgres.vercel-storage.com",
    USER:"default",
    PASSWORD:"wIQvBO3YiG7q",
    DB:"verceldb",
    dialect:"postgres",
    // กำหนดการเชื่อต่อ
    pool:{  
        // เชื่อมต่อมากสุด 5
        max:5,
        // เชื่อมต่อน้อยสุด 0 
        min:0,
        // รอไม่มีการเชื่อมต่อ หน่วยเป็น มิลลิวินาที นับโดยเป็นเป็น 30วินาที 
        arquire:30000,
        // รอเมื่อมีการเชื่อมต่อ ""
        idle:10000,
    }
}


// require('dotenv').config()
// module.exports={
//     HOST:"process.env.HOST",
//     USER:"process.env.USER",
//     PASSWORD:"process.env.PASSWORD",
//     DATABASE:"process.env.DATABASE"
// }
