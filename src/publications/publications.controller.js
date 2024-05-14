import PublicationModel from "./publications.model.js";
import {
    response
} from "express";

export const publicationGestorOpiniones = async(res = response) => {
    const publicationDefault = new PublicationModel({
        titulo: "Gestor de opiniones",
        descripcion: "Este sistema tiene como objetivo crear un sistema de gestión de opiniones similar a las publicaciones de Facebook, con funcionalidades específicas centradas en la interacción y expresión de opiniones por parte de los usuarios.",
        imagenPrincipal: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrp6pk5JEwV7dGsxQKBDtU3zDlqOi6l2w_hZ0H0Y0Oug&s",
        link: "https://github.com/jquezada2022505/GestorDeOpiniones.git",
        Funcion: "El usuario se registra en la aplicación, luego puede crear una opinión sobre un tema en particular, también puede comentar las opiniones de otros usuarios.",
        imagenes: ["https://www.veiss.com/blog/wp-content/uploads/2015/07/opiniones-internet.jpg",
            "https://images01.nicepagecdn.com/page/56/70/es/pagina-destino-preview-567002.jpg"
        ]
    })
    await publicationDefault.save();
}


export const publicationControlAcademico = async(res = response) => {
    const publicationDefault = new PublicationModel({
        titulo: "Control Académico",
        descripcion: "El proyecto consiste en una aplicación de ambiente web (solamente Backend) la cual servirá para: poder llevar el Control de Alumnos de un Centro Educativo.",
        imagenPrincipal: "https://d1ng31t6m9h8vv.cloudfront.net/wp-content/uploads/2023/09/06162030/Diseno-sin-titulo.png",
        link: "https://github.com/jquezada2022505/ControlAcademico.git",
        Funcion: "El profesor podrá crear, editar, eliminar y visualizar los cursos que el posea y El alumno podrá asignarse a como máximo 3 cursos.",
        imagenes: ["https://parzibyte.me/blog/wp-content/uploads/2019/12/Validaci%C3%B3n-en-el-control-escolar.png",
            "https://www.google.com/url?sa=i&url=https%3A%2F%2Fparzibyte.me%2Fblog%2F2019%2F12%2F08%2Fcontrol-escolar-software-web-gestion-escuelas%2F&psig=AOvVaw1ne4IIFgQIvzBiuBUPxm6d&ust=1715749292770000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJjz-a2ujIYDFQAAAAAdAAAAABAQ"
        ]
    })
    await publicationDefault.save();
}


export const publicationVentasOnline = async(res = response) => {
    const publicationDefault = new PublicationModel({
        titulo: "Ventas Online",
        descripcion: "Este proyecto se centra en el desarrollo de una API web implementada en NodeJS, destinada a gestionar el registro de ventas, productos en línea y otras operaciones comerciales de una empresa.",
        imagenPrincipal: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRcPK4ueUKOevoQOSxWB2sWeaublfOIkekrwlS8jZogg&s",
        link: "https://github.com/jquezada2022505/ProyectoBimestral1.git",
        Funcion: "La aplicación se estructura en dos secciones principales, administrador y cliente, cada uno con funcionalidades específicas.",
        imagenes: "https://res.cloudinary.com/dte7upwcr/image/upload/v1/blog/blog2/ventas-online-mejores-opciones/ventas-online-mejores-opciones-img_header.jpg"
    })
    await publicationDefault.save();
}


export const comprobarInformacion = async(req, res) => {
    const publications = await PublicationModel.find();
    if (publications.length === 0) {
        publicationGestorOpiniones(res);
        publicationControlAcademico(res);
        publicationVentasOnline(res);
    } else {
        console.log('Creando Publicaciones...');
        console.log('¡¡¡Publicaciones creadas exitosamente!!!');
    }
}

export const publicationGet = async(req, res) => {
    try {
        const publications = await PublicationModel.find();
        res.status(200).json(publications);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

export const publicationById = async(req, res) => {
    const {
        id
    } = req.params;
    const publication = await PublicationModel.findById(id);

    if (!publication) {
        return res.status(404).json({
            message: "No se encontro ninguna publicacion"
        });
    } else {
        res.status(200).json(publication);
    }


}

export const publicationPut = async(req, res) => {
    const {
        id
    } = req.params;

    const {
        nombre,
        comentario
    } = req.body;

    const currentDate = new Date();
    const nuevoComentario = {
        nombre: nombre,
        comentario: comentario,
        fecha: currentDate
    };
    console.log(nuevoComentario);
    await PublicationModel.findByIdAndUpdate(id, {
        $push: {
            comentarios: nuevoComentario
        }
    });
    res.status(200).json({
        message: "¡Comentario agregado exitosamente!"
    });
}