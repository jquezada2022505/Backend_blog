import mongoose, {  } from 'mongoose';

const ComentsSchema = mongoose.Schema({
    idPublication: {
        type: String,
        ref: "Publications",
        required: [true, "The publication is obligatory"],
    },
    descriptionComent: {
        type: String,
        required: [true, "The description is obligatory"],
    },
    responseComent: {
        type: mongoose.Schema.ObjectId,
        required: [true, "The response Coment is obligatory"],
    },
    estado: {
        type: Boolean,
        default: true,
    }
});

export default mongoose.model('Coments', ComentsSchema);