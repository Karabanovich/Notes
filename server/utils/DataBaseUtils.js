import mongoose from "mongoose";

import '../models/User';
const User = mongoose.model('User');

export function setUpConnection() {
    mongoose.connect(`mongodb://localhost:27017/Users`);
}
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
            if (data.note.label)
                doc.Folders[data.folder].Notes.unshift(data.note);
            else {
                let j = doc.Folders[data.folder].Notes.findIndex((el) => {
                    return !el.label;
                });
                if(j!==-1)
                    doc.Folders[data.folder].Notes.splice(j, 0, data.note);
                else
                    doc.Folders[data.folder].Notes.push(data.note);
            }
            User.update({ Name: data.user }, {
                Folders: doc.Folders
            }, { "multi": true }, () => { });


            F = true;
        }
    })

    return new Promise((res, rej) => { res(F) });
}
export function deleteNote(data) {
    var F = false;
    User.findOne({ Name: data.user }, (err, doc) => {
        if (doc) {
            doc.Folders[data.folder].Notes.splice(data.note, 1);
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
            doc.Folders.unshift({ folderName: data.folder, Notes: [] });

            User.update({ Name: data.user }, {
                Folders: doc.Folders
            }, { "multi": true }, () => { });
            F = true;
        }
    })

    return new Promise((res, rej) => { res(F) });
}
export function deleteFolder(data) {
    var F = false;
    User.findOne({ Name: data.user }, (err, doc) => {
        if (doc) {
            doc.Folders.splice(data.folder, 1);
            User.update({ Name: data.user }, {
                Folders: doc.Folders
            }, { "multi": true }, () => { });
            F = true;
        }
    })

    return new Promise((res, rej) => { res(F) });
}
export function addLabel(data) {
    var F = false;
    User.findOne({ Name: data.user }, (err, doc) => {
        if (doc) {
            let ind=0;
            if (!data.label) {
                ind = doc.Folders[data.folder].Notes.findIndex((el) => {
                    return !el.label;
                });
                if (ind === -1) {
                    let d = doc.Folders[data.folder].Notes.splice(data.note, 1)[0];
                    doc.Folders[data.folder].Notes.push(d);
                    ind = doc.Folders[data.folder].Notes.length - 1;
                }
                else {
                    doc.Folders[data.folder].Notes.splice(ind - 1, 0, doc.Folders[data.folder].Notes.splice(data.note, 1)[0]);
                    ind = ind - 1;
                }
            }
            else
                doc.Folders[data.folder].Notes.unshift(doc.Folders[data.folder].Notes.splice(data.note, 1)[0]);
            doc.Folders[data.folder].Notes[ind].label = data.label;
            User.update({ Name: data.user }, {
                Folders: doc.Folders
            }, { "multi": true }, () => { });
            F = true;
        }
    })
    return new Promise((res, rej) => { res(F) });
}
export function sendNote(data) {
    var F = false;
    User.findOne({ Name: data.rec }, (err, doc) => {
        if (doc) {
            let i = doc.Folders.findIndex((el) => {
                if (el.folderName === 'Inbox')
                    return true;
                else
                    return false;
            })
            if (i >= 0) {
                doc.Folders[i].Notes.unshift(Object.assign(data.note, { from: data.sen }));
            }
            else
                doc.Folders.push({ folderName: 'Inbox', Notes: [Object.assign(data.note, { from: data.sen })] })
            User.update({ Name: data.rec }, {
                Folders: doc.Folders
            }, { "multi": true }, () => { });
            F = true;
        }
    })
    return new Promise((res, rej) => { res(F) });
}