import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';


import * as db from './utils/DataBaseUtils';


const app = express();


db.setUpConnection();

app.use( bodyParser.json() );

app.use(cors({ origin: '*' }));


app.put('/users/isExist', (req, res) => {
    db.findUser(req.body).then(data => res.send(data));
});
app.put('/users/Reg', (req, res) => {
    db.Reg(req.body).then(data => res.send(data));
});

app.put('/notes/add', (req, res) => {
    db.addNote(req.body).then(data => res.send(data));
});
app.put('/notes/delete', (req, res) => {
    db.deleteNote(req.body).then(data => res.send(data));
});
app.put('/folders/add', (req, res) => {
    db.addFolder(req.body).then(data => res.send(data));
});
app.put('/folders/delete', (req, res) => {
    db.deleteFolder(req.body).then(data => res.send(data));
});
app.put('/notes/addLabel', (req, res) => {
    db.addLabel(req.body).then(data => res.send(data));
});
app.put('/notes/sendNote', (req, res) => {
    db.sendNote(req.body).then(data => res.send(data));
});

const server = app.listen(8080, function() {
    console.log(`Server is up and running on port 8080`);
});
