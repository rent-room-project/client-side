import { z } from 'zod';

export const typeSchema = z.object({
  id: z.string().uuid(),
  name: z.string()
});

export type Type = z.infer<typeof typeSchema>;
