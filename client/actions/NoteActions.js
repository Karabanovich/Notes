
const fetch=require('node-fetch');
const apiPrefix='http://localhost:8080';



const NoteActions = {
    

    addNote(user,folder,note) {
        return fetch(`${apiPrefix}/notes/add`,{
            method: 'put',
            body: JSON.stringify({user,folder,note}),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
        })
        .then((res)=>res.json())
        .catch(err =>
            console.error(err)
        );
    },


    addFolder(user,folder) {
        return fetch(`${apiPrefix}/folders/add`,{
            method: 'put',
            body: JSON.stringify({user,folder}),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
        })
        .then((res)=>res.json())
        .catch(err =>
            console.error(err)
        );
    },
};

export default NoteActions;
