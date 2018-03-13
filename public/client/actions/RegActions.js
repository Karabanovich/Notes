
const fetch=require('node-fetch');
const apiPrefix='http://localhost:8080';



const RegActions = {
    

    In(data) {
        return fetch(`${apiPrefix}/users/isExist`,{
            method: 'put',
            body: JSON.stringify(data),
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
    Up(data) {
        return fetch(`${apiPrefix}/users/Reg`,{
            method: 'put',
            body: JSON.stringify(data),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
        })
        .then((res)=>res.json())
        .catch(err =>
            console.error(err)
        );
    }
};

export default RegActions;
