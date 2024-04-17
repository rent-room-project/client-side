import { z } from 'zod';

export const historySchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  updatedBy: z.string()
});

export type History = z.infer<typeof historySchema>;
