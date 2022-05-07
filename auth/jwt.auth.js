const jwt  = require('jsonwebtoken')
const knex = require('../config/db')
 
const generateToken = (id) =>{
    return jwt.sign(id,'pawan')
}


const verifyToken = async(req,res,next)=>{
    if(req.headers.cookie){
        const token = req.headers.cookie.split('=')[1]
        const id = await jwt.verify(token,'pawan')
        console.log(id);
        const user = await knex('users').where({id})
        req.userData = user
    }
    next()
}


module.exports = {generateToken,verifyToken}