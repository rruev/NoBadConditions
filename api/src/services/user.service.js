import { userRepo } from '../repos/index.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwtToken.uitl.js';

export const create = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    delete data.confirmPassword;
    const user = await userRepo.create({ ...data, password: hashedPassword });
    const token = generateToken({ id: user.id, email: user.email });
    return { user, token };
};

export const login = async (data) => {
    const user = await userRepo.getByEmail(data.email);
    if (!user) {
        const error = new Error('User not found');
        error.name = 'UserNotFound';
        throw error;
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
        const error = new Error('Invalid password');
        error.name = 'InvalidPassword';
        throw error;
    }
    const token = generateToken({ id: user.id, email: user.email });
    return { user, token };
};

export const getById = async (id) => {
    return userRepo.getById(id);
};

export const getByEmail = async (email) => {
    return userRepo.getByEmail(email);
};


export const update = async (id, data) => {
    return userRepo.update(id, data);
};

export const remove = async (id) => {
    return userRepo.remove(id);
};