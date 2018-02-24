import mongoose from "mongoose";



import '../models/Note';
import '../models/User';
const Note = mongoose.model('Note');
const User = mongoose.model('User');
export function setUpConnection() {
    mongoose.connect(`mongodb://localhost:27017/Users`);
}

export function listNotes(id) {
    return Note.find();
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
export function createNote(data) {
    console.log(data);
    const note = new Note({
        title: data.title,
        text: data.text,
        createdAt: new Date()
    });

    return note.save();
}

export function deleteNote(id) {
    return Note.findById(id).remove();
}

