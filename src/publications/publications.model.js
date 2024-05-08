import mongoose, { } from 'mongoose';

const PublicationsSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "The title is obligatory"],
    },
    description: {
        type: String,
        required: [true, "The description is obligatory"],
    }
});

export default mongoose.model('Publications', PublicationsSchema);