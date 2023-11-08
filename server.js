const express = require("express");
const sql = require("./model/db");
const cors = require("cors");
const LibraryRouter = require("./router/Book.router");
const PORT = 5000;
const notFoundmiddelware = require("./middleware/not-fonud")
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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.get("/", (req, res,next) => {
  res.send("<h1> เราต่อได้แล้วนะ API-Library </h1>");
  next();
});

app.use("/book", LibraryRouter);
require("./router/auth.router")(app);
 app.use(notFoundmiddelware);

app.listen(PORT, () => {
  console.log("เซอร์เวอร์ต่ออยู่ที่ http://localhost:" + PORT);
  
});