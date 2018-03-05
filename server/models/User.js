import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    Name     : { type: String, required: true  },
    Password : { type: String, required: true },
<<<<<<< HEAD
    isOnline : {type: Boolean, required: true }
=======
    isOnline :{type:Boolean,required:true}
>>>>>>> 3a96246900bf90ef61df3910f7eaef7de61f12c4
});

mongoose.model('User', UserSchema);
