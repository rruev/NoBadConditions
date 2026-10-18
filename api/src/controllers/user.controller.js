import { userService } from '../services/index.js';
import { userLogInSchema, userRegisterSchema } from '../schemas/user.schema.js';
import { getErrors } from '../utils/errors.util.js';

export const register = async (req, res) => {
    try {
        const validatedData = await userRegisterSchema.parseAsync(req.body);
        const { user, token } = await userService.create(validatedData);

        res.cookie('auth-token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            id: user.id,
            email: user.email,
         });
    } catch (error) {
        res.status(400).json({ errors: getErrors(error) });
    }
};

export const login = async (req, res) => {
    try {
        const validatedData = await userLogInSchema.parseAsync(req.body);
        const { user, token } = await userService.login(validatedData);

        res.cookie('auth-token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({ 
            id: user.id,
            email: user.email,
         });
    } catch (error) {
        res.status(400).json({ errors: getErrors(error) });
    }
};

export const logout = async (req, res) => {
    res.clearCookie('auth-token', {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

export const getUser = async (req, res) => {
    try {
        const user = await userService.getByEmail(req.user.email);
        if (!user) {
            return res.status(404).json({ errors: ['User not found'] });
        }
        res.status(200).json({
            id: user.id,
            email: user.email
        });
    } catch (error) {
        res.status(400).json({ errors: getErrors(error) });
    }
};

export const getById = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await userService.getById(userId);
        if (!user) {
            return res.status(404).json({ errors: ['User not found'] });
        }
        res.status(200).json({
            id: user.id,
            email: user.email
        });
    } catch (error) {
        res.status(400).json({ errors: getErrors(error) });
    }
};

export const update = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await userService.update(userId, req.body);
        if (!user) {
            return res.status(404).json({ errors: ['User not found'] });
        }
        res.status(200).json({
            id: user.id,
            email: user.email
        });
    } catch (error) {
        res.status(400).json({ errors: getErrors(error) });
    }
};

export const remove = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await userService.remove(userId);
        if (!user) {
            return res.status(404).json({ errors: ['User not found'] });
        }

        res.clearCookie('auth-token', {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        });
        res.status(200).json({ message: 'User removed successfully' });
    } catch (error) {
        res.status(400).json({ errors: getErrors(error) });
    }
};