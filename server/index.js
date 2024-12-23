const express = require('express');
const cors = require('cors');
const Query = require('./db');

const app = express()
app.use(express.json())
app.use(cors({
    origin: 'https://rafaelgenish111.github.io/test_project/'
}))

app.get('/', (req, res) => {
    res.send('welcome!!!')
})

app.post('/register', async (req, res) => {
    const {fname, lname, phone, password, username} = req.body
    try {
        if (fname && lname && phone && password && username) {
            const q = `INSERT INTO users(fname, lname, phone, password, username) VALUES (?, ?, ?, ?, ?)`
            const data = await Query(q, [fname, lname, phone, password, username])
            console.log("OK");
            res.status(200).json(data)
            // if (data.OK) {
            // } else {
            //     res.status(400).json({err: true, msg: "have a problem"})
            // }
        } else {
            res.status(400).json({err: true, msg: "some info missing"})
        }
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await Query (`SELECT * FROM users WHERE username = ${username}`)
        if (!user) {
            res.status(200).json(user)
        } else {
            res.status(400).json({err: true, msg: "user is not exist"})
        }
    } catch (error) {
        
    }
})

const port = process.env.PORT || 1000

app.listen(port, () => {
    console.log(`listening to port ${port}`);
})