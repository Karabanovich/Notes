import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';


import * as db from './utils/DataBaseUtils';

// Initialization of express application
const app = express();

// Set up connection of database
db.setUpConnection();

// Using bodyParser middleware
app.use( bodyParser.json() );

// Allow requests from any origin
app.use(cors({ origin: '*' }));

// RESTful api handlers
app.get('/notes', (req, res) => {
    db.listNotes().then(data => res.send(data));
});


app.put('/users/isExist', (req, res) => {
    db.findUser(req.body).then(data => res.send(data));
});
app.put('/users/Reg', (req, res) => {
    db.Reg(req.body).then(data => res.send(data));
});

app.delete('/notes/:id', (req, res) => {
    db.deleteNote(req.params.id).then(data => res.send(data));
});

const server = app.listen(8080, function() {
    console.log(`Server is up and running on port 8080`);
});
