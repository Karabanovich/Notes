import mongoose from "mongoose";



import '../models/Note';
import '../models/User';
const Note = mongoose.model('Note');
const User = mongoose.model('User');

export function setUpConnection() {
    mongoose.connect(`mongodb://localhost:27017/Users`);
}

export function createUser(data) {
    const user = new User({
        Name: data.Name,
        Password: data.Password,
    });
    User.find({}, function(err, users) {
        var userMap = {};
    
        users.forEach(function(user) {
            console.log(user);
          //userMap[user._id] = user;
        });
    });
    return user.save();
}

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
export function findUser(data){
    var f=false;

    return User.find({},()=>{}).then(arr=>{
        [].forEach.call(arr,(user)=>{
            if(user.Name==data.Username&&user.Password==data.Password)
                f=true;
        })
        return new Promise((res,rej)=>{res(f)});
    })
}
export function Reg(data){
    var f=true;
    return User.find({},()=>{}).then(arr=>{
        [].forEach.call(arr,(user)=>{
            if(user.Name==data.Username)
                f=false;
        })
        return new Promise((res,rej)=>{res(f)});
    }).then((res)=>{
        if(res){
            const user = new User({
                Name: data.Username,
                Password: data.Password,
                isOnline:true
            });
            user.save();
            return new Promise((res,rej)=>{res(true)});
        }
        else
            return new Promise((res,rej)=>{res(false)});
    })
}
