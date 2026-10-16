import { verifyToken } from '../utils/jwtToken.uitl.js';

export const authMiddleware = (req, res, next) => {
    const token = req.cookies['auth-token'];

    if (!token) {
        return next();
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
    } catch (error) {
        res.clearCookie('auth-token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None'
        });
        return res.status(400).json({ message: 'Invalid token.' });
    }

    next();
};

export const isAuthenticated = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Access denied. User not authenticated.' });
    }
    next();
};

export const isGuest = (req, res, next) => {
    if (req.user) {
        return res.status(403).json({ message: 'Access denied. User is already authenticated.' });
    }
    next();
};