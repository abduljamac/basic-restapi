const express = require('express')
const mysql = require('mysql')
const router = express.Router()

const connection = mysql.createPool({
    connectionLimitL:10,
    host:'',
    user:'',
    password:'',
    database:''
})

router.get('/allstars', (req, res) => {
    console.log('fetching all the nba allstars')

    const query = 'SELECT * FROM nba_allstars'
    connection.query(query, (err,rows,field) => {
        res.json(rows)
        // const players = rows.map((row) => {
        //     return {
        //         firstName: row.first_name,
        //         lastName: row.last_name
        //     }
        // })
        // res.json(players)
        if(err){
            console.log('Failed to qury for user' + err)
            res.sendStatus(500)
            res.end()
            return
        }
    })
})

router.get('/allstars/:id', (req, res) => {
    console.log('Fetching player with id' + req.params.id);
    const userID = req.params.id
    const query = 'SELECT * FROM nba_allstars where id = ?'
    connection.query(query, [userID] , (err,rows,field) => {
       res.json(rows)
    
    })
})

router.post('/player_create', (req, res) => {
    console.log("Trying to create a new user..");
    console.log('getting form data');

    // console.log("first name: " + req.body.create_first_name);
    const firstName = req.body.create_first_name
    const lastName =  req.body.create_last_name

    const query = ' INSERT INTO nba_allstars (first_name, last_name) VALUES (?,?)'
    connection.query(query, [firstName, lastName], (err,rows,field) => {
        if(err){
            console.log('Failed to insert new user:' + err )
            res.sendStatus(500)
            res.end()
            return
        }
        console.log('Inserted a new user with id: ' + rows.insertId);

    })

})


module.exports = router