import { response } from "express";
import Comentario from '../coments/coments.model.js';

export const comentsGet = async(req , res = response) => {
    const query = { estado: true };
    const [total, coments] = await Promise.all([
        Comentario.countDocuments(query),
        Comentario.find(query)
    ]);

    res.status(200).json({
        total,
        coments
    });
}

export const comentsPost = async(req, res) => {
    const { idPublication, descriptionComent, responseComent} = req.body;

    try {
        if (!descriptionComent) {
            return res.status(400).json({
                msg: 'The description of the comment is required'
            });
        }

        const comentario = new Comentario({
            idPublication,
            descriptionComent,
            responseComent
        });

        await comentario.save();

        res.status(200).json({
            msg: 'Comment added successfully',
            comentario
        });
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(400).json({ error: 'Error creating comment' });
    }
};




export const getComentsByParentComentId = async(req, res) => {
    const { id } = req.params;
    const comentarios = await Comentario.find({ responseComent: id });

    res.status(200).json({
        comentarios
    })
}


export const comentsDelete = async(req, res) => {
    const { id } = req.params;

    try {
        const comentario = await Comentario.findByIdAndUpdate(id, { estado: false });
        if (!comentario) {
            return res.status(404).json({ msg: 'Comment not found' });
        }

        res.status(200).json({ msg: 'Comment deleted successfully', comentario});
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(40).json({ error: 'Error deleting comment' });
    }

};