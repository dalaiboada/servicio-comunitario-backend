import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const isDevelopment = process.env.NODE_ENV === 'development';

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No se proporcionó un token' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        // Agregar el usuario al request
        req.user = decoded;

        next();
    } catch (error) {
        if(error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Token inválido' });
        }

        if(error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expirado' });
        }

        return res.status(500).json({ 
            message: 'Error en el servidor',
            error: isDevelopment ? error.message : 'Error en el servidor' 
        });
    }
};

export default verifyToken;
