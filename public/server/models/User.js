import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    Name     : { type: String, required: true  },
    Password : { type: String, required: true },
    Folders:[mongoose.Schema.Types.Mixed]
});

mongoose.model('User', UserSchema);
