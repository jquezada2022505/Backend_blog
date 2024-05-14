'use strict'
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import { comprobarInformacion } from '../src/publications/publications.controller.js';
import publicationRoutes from '../src/publications/publications.routes.js'

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.publicationPath = '/blog/v1';

        this.middlewares();
        this.connectDB();
        this.routes();
    }

    async connectDB() {
        await dbConnection();
        await comprobarInformacion();
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
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default Server;