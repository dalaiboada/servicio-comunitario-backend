import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Coordinator from '../models/Coordinator.js';

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;
const isDevelopment = process.env.NODE_ENV === 'development';

// Configuración de Cookies
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: !isDevelopment, 
    sameSite: isDevelopment ? 'lax' : 'none',
    maxAge: 24 * 60 * 60 * 1000 // 24 horas
};

const generateToken = userId => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN 
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ message: 'Faltan credenciales' });
    }

    const user = await Coordinator.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = generateToken(user._id);

    // Enviar a cookie
    res.cookie('token', token, COOKIE_OPTIONS);

    res.status(200).json({ 
        message: 'Inicio de sesión exitoso',
        user: {
            id: user._id,
            username: user.username,
            name: user.name,
            lastName: user.lastName
        } 
    });
  } 
  catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ 
        message: 'Error al iniciar sesión',
        error: isDevelopment ? error.message : 'Error al iniciar sesión' 
    });
  }
};

const register = async (req, res) => {
  const { name, lastName, username, password } = req.body;

  try {
    if (!username || !password || !name || !lastName) {
      return res.status(400).json({ message: 'Faltan credenciales' });
    }

    const user = await Coordinator.findOne({ username });
    console.log(user);
    if (user) {
      return res.status(409).json({ message: 'El nombre de usuario ya existe' });
    }

    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = new Coordinator({
      name,
      lastName,
      username,
      password_hash
    });

    await newUser.save();

    const token = generateToken(newUser._id);

    // Enviar a cookie
    res.cookie('token', token, COOKIE_OPTIONS);

    res.status(201).json({ 
        message: 'Usuario registrado exitosamente',
        user: {
            id: newUser._id,
            username: newUser.username,
            name: newUser.name,
            lastName: newUser.lastName
        } 
    });
  } 
  catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ 
        message: 'Error al registrar usuario',
        error: isDevelopment ? error.message : 'Error al registrar usuario' 
    });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie('token', COOKIE_OPTIONS);
    res.status(200).json({ message: 'Cierre de sesión exitoso' });
  } 
  catch (error) {
    console.error('Error al cerrar sesión:', error);

    res.status(500).json({ 
        message: 'Error al cerrar sesión',
        error: isDevelopment ? error.message : 'Error al cerrar sesión' 
    });
  }
};

export default {
  login,
  logout,
  register
};
