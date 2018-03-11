import mongoose from "mongoose";



//import '../models/Note';
import '../models/User';
//const Note = mongoose.model('Note');
const User = mongoose.model('User');

export function setUpConnection() {
    mongoose.connect(`mongodb://localhost:27017/Users`);
}


/*
export function listNotes(id) {
    return Note.find();
}

let _id=0;
export function createNote(data) {
    //console.log(data);
    const note = new Note({
        title: data.title ? data.title : "",
        text: data.text,
        createdAt: new Date(),
        id: _id++,
        author: data.author,
        parentFolder: data.parentFolder ? data.parentFolder : "",
    });

    return note.save((err)=>{
        console.log("Cannot save note", note);
    });
}

export function findNote(id){
    return Note.findById(id);
}

export function deleteNote(id) {
    return Note.findById(id).remove();
}
*/
/////////////////////////////////////////////////////////
export function findUser(data) {
    var Folders = null;
    return User.find({}, () => { }).then(arr => {
        [].forEach.call(arr, (user) => {
            if (user.Name == data.Username && user.Password == data.Password) {
                Folders = user.Folders;
            }
        })
        return new Promise((res, rej) => { res(Folders) });
    })
}
export function Reg(data) {
    var f = true;
    return User.find({}, () => { }).then(arr => {
        [].forEach.call(arr, (user) => {
            if (user.Name == data.Username)
                f = false;
        })
        return new Promise((res, rej) => { res(f) });
    }).then((res) => {
        if (res) {
            const user = new User({
                Name: data.Username,
                Password: data.Password,
                Folders: [{ folderName: 'Main', Notes: [] }]
            });
            user.save();
            return new Promise((res, rej) => { res(user.Folders) });
        }
        else
            return new Promise((res, rej) => { res(false) });
    })
}
export function addNote(data) {
    var F = false;
    User.findOne({ Name: data.user }, (err, doc) => {
        if (doc) {
            let i = doc.Folders.findIndex((f) => {
                return f.folderName === data.folder;
            })
            doc.Folders[i].Notes.push(data.note);

            User.update({ Name: data.user }, {
                Folders: doc.Folders
            }, { "multi": true }, () => { });


            F = true;
        }
    })
   
    return new Promise((res, rej) => { res(F) });
}
export function addFolder(data) {
    var F = false;
    User.findOne({ Name: data.user }, (err, doc) => {
        if (doc) {
            doc.Folders.push({folderName:data.folder,Notes:[]});

            User.update({ Name: data.user }, {
                Folders: doc.Folders
            }, { "multi": true }, () => { });
            F = true;
        }
    })
   
    return new Promise((res, rej) => { res(F) });
}
