import express from 'express';
import cors from 'cors';
import fs from 'fs';          
import path from 'path';      
import { fileURLToPath } from 'url';
import connectDB from './config/db.js'; 

// --- CONFIGURACIÓN DE VARIABLES DE ENTORNO ---
import dotenv from 'dotenv';
dotenv.config();

// --- CONEXIÓN A LA BASE DE DATOS ---
connectDB();

// --- CONFIGURACIÓN DE RUTAS ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

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
app.use(cors());
app.use(express.json());

// --- ARCHIVOS ESTATICOS ---
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// --- RUTA DE PRUEBAS ---
app.get('/', (req, res) => {
    res.json({ message: 'API is running successfully!' });
});

// --- INICIAR SERVIDOR ---
app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});