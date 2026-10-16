import * as z from 'zod';

export const getErrors = (error) => {
    let errors = {};

    if (error.name === 'ZodError') {
        errors = z.flattenError(error).fieldErrors;
    } else if (error.name === 'PrismaClientKnownRequestError') {
        if (error.code === 'P2002') {
            errors = { email: ['Email already exists'] };
        } else if (error.code === 'P2025') {
            errors = { general: [`${error.meta?.modelName ?? 'Record'} not found`] };
        } else {
            errors = { general: ['Database error occurred'] };
        }
    } else if (error.name === 'InvalidPassword') {
        errors = { password: ['Invalid password'] };
    } else if (error.name === 'UserNotFound') {
        errors = { email: ['User with this email does not exist'] };
    } else {
        errors = { general: ['An unexpected error occurred'], error: error.message };
    }
    console.log('Error details:', error);
    return errors;
}