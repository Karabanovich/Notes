//import AppDispatcher from '../dispatcher/AppDispatcher';


import axios from 'axios';
const apiPrefix='http://localhost:8080';



const RegActions = {
    

    Reg(data) {
        axios.post(`${apiPrefix}/users`, data)
        .catch(err =>
            console.error(err)
        );
    }
};

export default RegActions;
