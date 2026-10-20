import z from 'zod';

export const createCragSchema = z.object({
    name: z.string().min(1),
    latitude: z.coerce.number().min(-90).max(90),
    longitude: z.coerce.number().min(-180).max(180),
});

export const updateCragSchema = z.object({
    name: z.string().min(1).optional(),
    latitude: z.coerce.number().min(-90).max(90).optional(),
    longitude: z.coerce.number().min(-180).max(180).optional(),
});