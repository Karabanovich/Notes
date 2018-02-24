import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    title     : { type: String },
    text      : { type: String, required: true },
    createdAt : { type: Date }
});

mongoose.model('Note', NoteSchema);
