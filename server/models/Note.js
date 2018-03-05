import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    title       : { type: String },
    text        : { type: String, required: true },
    createdAt   : { type: Date   },
    id          : { type: String },
    author      : { type: String },
    parentFolder: { type: String },
    label       : { type: Boolean }
});

mongoose.model('Note', NoteSchema);
