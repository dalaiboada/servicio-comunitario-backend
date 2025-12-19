import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import fs from 'fs';          
import path from 'path';      
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';

import authRoutes from './routes/auth.routes.js';

// --- CONFIGURACIÓN DE VARIABLES DE ENTORNO ---
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL;

// --- CONFIGURACIÓN DE CORS ---
const whiteList = [
    `http://127.0.0.1:5500`, // Para Live Server
    `http://127.0.0.1:5173`, // Para Vite
    FRONTEND_URL
];

const corsOptions = {
    origin: function (origin, callback) {
        // Caso 1: Peticiones sin origen (como Postman o Apps móviles) -> PERMITIR
        if (!origin) return callback(null, true);

        // Caso 2: El origen está en la lista -> PERMITIR
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true);
        } 
        else {
            // Caso 3: El origen no está invitado -> BLOQUEAR
            console.log(`🚫 CORS Blocked request from: ${origin}`);
            callback(new Error('Blocked by CORS: Tu dominio no tiene permiso.'));
        }
    },
    credentials: true, // <--- OBLIGATORIO para que pasen las Cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'] // Cabeceras permitidas
};

// --- CONEXIÓN A LA BASE DE DATOS ---
connectDB();

// --- CONFIGURACIÓN DE RUTAS ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const ensureDirectories = () => {
    const requiredDirs = [
        path.join(__dirname, 'public'),
        path.join(__dirname, 'public/uploads'),
        path.join(__dirname, 'public/uploads/images'),
        path.join(__dirname, 'public/uploads/documents')
    ];

    requiredDirs.forEach(dir => {
        // Crear directorio si no existe
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log(`✅ Directory created: ${dir}`);
        }
    });
};

ensureDirectories();

// --- MIDDLEWARES ---
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// --- ARCHIVOS ESTATICOS ---
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// --- RUTAS ---
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is running successfully!' });
});

app.use('/api/auth', authRoutes);

// Rutas no encontradas (404)
app.use((req, res) => {
    res.status(404).json({
        message: 'Ruta no encontrada / Endpoint not found'
    });
});

// --- INICIAR SERVIDOR ---
app.listen(PORT, () => {
    console.log(`\n🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});