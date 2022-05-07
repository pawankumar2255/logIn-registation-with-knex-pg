const knex = require('../config/db')
const express = require('express')
const bcrypt = require('bcrypt')
const {generateToken, verifyToken} = require('../auth/jwt.auth')


const app = express()

app.use(express.json())

app.post('/register', async(req,res)=>{
    try {
        const {name,email,password} = await req.body
        const encrypted = await bcrypt.hash(password, 10)
        console.log(encrypted);
        const user = await knex('users').insert({
            name,
            email,
            password:encrypted
        })
        res.send(user)
    } catch (error) {
        res.send(error.message)
    }
})



app.post('/login', async(req,res)=>{
    try {
        const {email,password} = await req.body
        const userData = await knex('users').where({email})
        console.log(userData);
        if (userData.length>0){
            const decryptpass = await bcrypt.compare(password,userData[0].password)
            if (decryptpass){
                const token = generateToken(userData[0].id)
                res.cookie('authToken',token)
                return res.send('you are logged in successfully')
            }
        }res.send('invalid credential')

    } catch (error) {
        res.send(error.message)
    }
})


app.get('/profile',verifyToken,(req,res)=>{
    res.send(`Welcome ${req.userData[0].name}`)
})


app.get('/logout',(req,res)=>{
    res.clearCookie('authToken').send('You are logged out ')
})


const port = 4000
app.listen(port,()=>{
    console.log('server is listening to port 4000');
})









