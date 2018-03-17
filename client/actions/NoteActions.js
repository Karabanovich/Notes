
const fetch = require('node-fetch');
const apiPrefix = 'http://localhost:8080';



const NoteActions = {


    addNote(user, folder, note) {
        return fetch(`${apiPrefix}/notes/add`, {
            method: 'put',
            body: JSON.stringify({ user, folder, note }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .catch(err =>
                console.error(err)
            );
    },

    deleteNote(user, folder, note) {
        return fetch(`${apiPrefix}/notes/delete`, {
            method: 'put',
            body: JSON.stringify({ user, folder, note }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .catch(err =>
                console.error(err)
            );
    },
    addFolder(user, folder) {
        return fetch(`${apiPrefix}/folders/add`, {
            method: 'put',
            body: JSON.stringify({ user, folder }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .catch(err =>
                console.error(err)
            );
    },
    deleteFolder(user, folder) {
        return fetch(`${apiPrefix}/folders/delete`, {
            method: 'put',
            body: JSON.stringify({ user, folder }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .catch(err =>
                console.error(err)
            );
    },
    addLabel(user, folder, note, label) {
        return fetch(`${apiPrefix}/notes/addLabel`, {
            method: 'put',
            body: JSON.stringify({ user, folder, note, label }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .catch(err =>
                console.error(err)
            );
    },
    sendNote(sen, note, rec) {
        return fetch(`${apiPrefix}/notes/sendNote`, {
            method: 'put',
            body: JSON.stringify({ sen, note, rec }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .catch(err =>
                console.error(err)
            );
    },
};

export default NoteActions;
