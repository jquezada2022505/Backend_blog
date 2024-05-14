import mongoose from "mongoose";

const PublicationSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    imagenPrincipal: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    Funcion: {
        type: String,
        required: true
    },
    imagenes: {
        type: Array,
        required: true
    },
    comentarios: {
        nombre: {
            type: String,
        },
        comentario: {
            type: String,
        },
        fecha: {
            type: Date,
        }
    }
})

export default mongoose.model('Publication', PublicationSchema);