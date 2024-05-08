'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js';
import publicationRoutes from '../src/publications/publications.routes.js';
import comentRoutes from '../src/coments/coments.routes.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.publicationPath = '/api/publication';
        this.comentPath = '/api/coment';
        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes() {
        this.app.use(this.publicationPath, publicationRoutes);
        this.app.use(this.comentPath, comentRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default Server;