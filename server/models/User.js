import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    Name     : { type: String, required: true  },
    Password : { type: String, required: true },
    isOnline :{type:Boolean,required:true}
});

mongoose.model('User', UserSchema);
