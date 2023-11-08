const notFound = (req , res , next) =>{
    res.status(400).send("Router does not exist")
    next()
}
module.exports = notFound;