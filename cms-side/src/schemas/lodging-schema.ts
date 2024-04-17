import { z } from 'zod';
import { typeSchema } from './type-schema';
import { userSchema } from './user-schema';

const lodgingSchema = z.object({
  id: z.string().uuid(),
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string'
    })
    .min(1, 'Name must have at least 1 character')
    .max(255, 'Name is too long'),
  facility: z
    .string({
      required_error: 'Facility is required',
      invalid_type_error: 'Facility must be a string'
    })
    .min(1, 'Facility must have at least 1 character')
    .max(255, 'Facility is too long'),
  roomCapacity: z
    .number({
      required_error: 'Room Capacity is required',
      invalid_type_error: 'Room Capacity must be a number'
    })
    .int('Room Capacity must be an integer'),
  imgUrl: z
    .string({
      required_error: 'Image URL is required',
      invalid_type_error: 'Image URL must be a string'
    })
    .url('Image URL must be a valid URL')
    .max(255, 'Image URL is too long'),
  location: z
    .string({
      required_error: 'Location is required',
      invalid_type_error: 'Location must be a string'
    })
    .min(1, 'Location must have at least 1 character')
    .max(255, 'Location is too long'),
  price: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number'
    })
    .int('Price must be an integer')
    .gte(100_000, 'minimum Price is 100000'),
  status: z.string(),
  TypeId: z
    .string({
      required_error: 'Type ID is required',
      invalid_type_error: 'Type ID must be a string'
    })
    .uuid('Type ID must be a valid UUID'),
  Type: typeSchema,
  AuthorId: z
    .string({
      required_error: 'Author ID is required',
      invalid_type_error: 'Author ID must be a string'
    })
    .uuid('Author ID must be a valid UUID'),
  Author: userSchema
});

export type Lodging = z.infer<typeof lodgingSchema>;

export const payloadLodgingSchema = lodgingSchema.omit({
  id: true,
  Author: true,
  Type: true,
  AuthorId: true,
  status: true
});

export type PayloadLodging = z.infer<typeof payloadLodgingSchema>;
