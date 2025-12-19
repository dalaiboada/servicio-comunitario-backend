import mongoose from 'mongoose';

const ResourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['guía', 'plantilla', 'formato', 'reglamento', 'otro'], 
        default: 'formato'
    },
    type: {
        type: String, // Ej: 'pdf' o 'docx'
        required: true
    },
    size: {
        type: Number, // Peso del archivo en Bytes (Se guarda automático al subir)
        required: true
    },
    fileUrl: {
        type: String, // Ruta del archivo
        required: true
    },
    date: {
        type: Date,
        default: Date.now // Fecha del proyecto
    }
}, {
    timestamps: true
});

const Resource = mongoose.model('Resource', ResourceSchema);
export default Resource;