import * as z from 'zod';

export const cragSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    city: z.string(),
    country: z.string(),
    latitude: z.coerce.number("enter a valid number").min(-90, 'Latitude must be at least -90').max(90, 'Latitude must be at most 90'),
    longitude: z.coerce.number("enter a valid number").min(-180, 'Longitude must be at least -180').max(180, 'Longitude must be at most 180'),
});