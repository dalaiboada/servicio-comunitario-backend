import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    tutors: {
        academic: { 
            type: String, 
            required: true 
        },
        industrial: { 
            type: String, 
            required: true 
        }
    },
    period: {
        type: String, // e.g., "2025-I"
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    members: [{
        ci: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        career: { type: String, required: true },
        _id: false // Evita que Mongoose cree un ID único para cada estudiante
    }],
    // ARRAY DE OBJETOS: Archivos adjuntos (Informes, etc.)
    files: [{
        name: { type: String, required: true }, // Nombre original del archivo
        url: { type: String, required: true },  // Ruta donde se guardó
        _id: false // Evita ID innecesario
    }],
    // Galería de imágenes
    imageUrls: [{
        type: String // Rutas de las fotos
    }]
}, {
    timestamps: true // Crea createdAt y updatedAt automáticamente
});

const Project = mongoose.model('Project', ProjectSchema);
export default Project;