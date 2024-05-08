import { response } from "express";
import Publications from './publications.model.js';

export const publicationsGet = async (req, res = response) => {
    const [total, publications] = await Promise.all([
        Publications.countDocuments(),
        Publications.find()
    ]);

    res.status(200).json({
        total,
        publications
    });
}


export const publicationsPost = async (req, res) => {
    const { title, description } = req.body;

    try {
        const publication = new Publications({
            title,
            description
        });

        await publication.save();

        res.status(200).json({
            msg: 'Publication added successfully',
            publication
        });
    } catch (error) {
        console.error('Error creating publication:', error);
        res.status(500).json({ error: 'Error creating publication' });
    }
};

export const getPublicationsById = async (req, res) => {
    const { id } = req.params;
    const publications = await Publications.findOne({ _id: id });

    res.status(200).json({
        publications
    })
}

export const publicationsDelete = async (req, res) => {
    const { id } = req.params;

    try {
        const publication = await Publications.findByIdAndDelete(id);
        if (!publication) {
            return res.status(404).json({ msg: 'Publication not found' });
        }

        res.status(200).json({ msg: 'Publication deleted successfully', publication });
    } catch (error) {
        console.error('Error deleting publication:', error);
        res.status(500).json({ error: 'Error deleting publication' });
    }
};