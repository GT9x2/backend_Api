const express = require("express");
const router = express.Router();
const {getAll,createBook,getBookId,editBook,deleteId} = require("../controller/Book.controller");
const {authJwt} = require("../middleware/index")

router.get("/",getAll)
router.post("/",createBook)
router.get("/:id",[authJwt.verifyToken,authJwt.isAdmin],getBookId )
router.put("/:id",[authJwt.verifyToken,authJwt.isAdmin],editBook)
router.delete("/:id",[authJwt.verifyToken,authJwt.isAdmin],deleteId)


module.exports = router;
