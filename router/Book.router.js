const express = require("express");
const router = express.Router();
// const Book = require("../controller/Book.controller")
const {getAll,createBook,getBookId,editBook,deleteId} = require("../controller/Book.controller");

router.get("/",getAll)
router.post("/",createBook)
router.get("/:id",getBookId )
router.put("/:id",editBook)
router.delete("/:id",deleteId)


module.exports = router;
