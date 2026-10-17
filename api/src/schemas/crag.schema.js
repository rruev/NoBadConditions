import z from 'zod';

export const createCragSchema = z.object({
    name: z.string().min(1),
    longitude: z.coerce.number().min(-180).max(180),
    latitude: z.coerce.number().min(-90).max(90)
});

export const updateCragSchema = z.object({
    name: z.string().min(1).optional(),
    longitude: z.coerce.number().min(-180).max(180).optional(),
    latitude: z.coerce.number().min(-90).max(90).optional(),
});