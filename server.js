const express = require("express");
const sql = require("./model/db");
const cors = require("cors");
const LibraryRouter = require("./router/Book.router");
const PORT = 5000;
const notFoundmiddelware = require("./middleware/not-fonud")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// การประเรียกใช้service ของ express
const app = express();
const db = require("./model/index")
const role = db.role

// เพิ่มตาราง
//devmode
// db.sequelize.sync({force:true}).then(()=>{
//     console.log('Drop and resync DB');
//     initial();
// })


function initial(){
  role.create({
    id:1,
    name:'user',
  })
  role.create({
    id:2,
    name:'moderator',
  })
  role.create({
    id:3,
    name:'admin',
  })
}



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOption));

const whitelist = ['http://localhost:5000','http://localhost:5173','https://extinct-ruby-cap.cyclic.app']
const corsOption = {
  origin:function(origin,callback){
    if (whitelist.indexOf(origin) !== -1) {
      callback(null,true)
    } else {
      callback(new Error('Not allow by CORS'))
    }
  }
}
  



app.get("/", (req, res,next) => {
  res.send("<h1> เราต่อได้แล้วนะ API-Library </h1>");
  next();
});


app.listen(PORT, () => {
  console.log("เซอร์เวอร์ต่ออยู่ที่ http://localhost:" + PORT);
  
});



app.use("/books", LibraryRouter);
require("./router/auth.router")(app);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
 app.use(notFoundmiddelware);